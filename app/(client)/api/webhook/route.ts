import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

// Config - Node.js runtime required for Buffer/uuid
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  // 1. Get raw body and signature
  const rawBody = await req.arrayBuffer();
  const buf = Buffer.from(rawBody);
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature header" }, { status: 401 });
  }

  // 2. Verify webhook
  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
  if (!webhookSecret) {
    console.error("Webhook secret missing");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Webhook verification failed: ${message}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 3. Handle checkout.session.completed
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;
      const invoice = session.invoice
        ? await stripe.invoices.retrieve(session.invoice as string)
        : null;

      await createOrderInsanity(session, invoice);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Order creation failed";
      console.error(message);
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  return NextResponse.json({ success: true });
}

async function createOrderInsanity(
  session: Stripe.Checkout.Session,
  invoice: Stripe.Response<Stripe.Invoice> | null
) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No user ID found in session metadata");
    throw new Error("No user ID found in session metadata");
  }

  // Get customer name from multiple possible sources
  const customerName =
    session.metadata?.customerName ||
    session.customer_details?.name ||
    "Unknown Customer";

  // First, check if the user exists in Sanity
  try {
    const user = await backendClient.fetch(
      `*[_type == "user" && _id == $userId][0]`,
      { userId }
    );

    if (!user) {
      // Create the user if it doesn't exist
      const userData = {
        _type: "user",
        _id: userId,
        name: customerName,
        email: session.customer_email || session.customer_details?.email || "",
        createdAt: new Date().toISOString(),
      };

      await backendClient.create(userData);
      console.log("User created successfully in Sanity");
    }
  } catch (error) {
    console.error("Error checking/creating user in Sanity:", error);
    throw error;
  }

  const orderData = {
    _type: "order",
    _id: `order-${uuidv4()}`,
    user: {
      _type: "reference",
      _ref: userId,
      _key: userId,
    },
    orderNumber: session.metadata?.orderNumber || "",
    customerName: customerName,
    email: session.customer_email || session.customer_details?.email || "",
    total: session.amount_total ? session.amount_total / 100 : 0,
    status: session.payment_status === "paid" ? "paid" : "pending",
    stripeId: session.id,
    invoiceId: invoice?.id || "",
    invoiceNumber: invoice?.number || "",
    invoiceUrl: invoice?.hosted_invoice_url || "",
    invoicePdf: invoice?.invoice_pdf || "",
    items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
    createdAt: new Date().toISOString(),
  };

  try {
    await backendClient.create(orderData);
    console.log("Order created successfully in Sanity");
  } catch (error) {
    console.error("Error creating order in Sanity:", error);
    throw error;
  }
}
