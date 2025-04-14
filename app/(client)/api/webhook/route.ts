import { Metadata } from "@/actions/createCheckoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "micro"; // ✅ required
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

// ✅ required for raw body parsing to work
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer(); // ✅ use arrayBuffer, not text
  const buf = Buffer.from(rawBody);        // ✅ convert to buffer
  const sig = headers().get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No Signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_KEY;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook secret not set" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return NextResponse.json({ error: `Webhook Error: ${error}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const invoice = session.invoice
      ? await stripe.invoices.retrieve(session.invoice as string)
      : null;

    try {
      await createOrderInsanity(session, invoice);
    } catch (error) {
      console.error("Error creating order in Sanity:", error);
      return NextResponse.json({ error: `Create order error: ${error}` }, { status: 400 });
    }
  }

  return NextResponse.json({ received: true });
}

async function createOrderInsanity(session: Stripe.Checkout.Session, invoice: Stripe.Response<Stripe.Invoice> | null) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error('No user ID found in session metadata');
    throw new Error('No user ID found in session metadata');
  }

  // Get customer name from multiple possible sources
  const customerName = session.metadata?.customerName || 
                      session.customer_details?.name || 
                      'Unknown Customer';

  // First, check if the user exists in Sanity
  try {
    const user = await backendClient.fetch(`*[_type == "user" && _id == $userId][0]`, { userId });
    
    if (!user) {
      // Create the user if it doesn't exist
      const userData = {
        _type: 'user',
        _id: userId,
        name: customerName,
        email: session.customer_email || session.customer_details?.email || '',
        createdAt: new Date().toISOString(),
      };
      
      await backendClient.create(userData);
      console.log('User created successfully in Sanity');
    }
  } catch (error) {
    console.error('Error checking/creating user in Sanity:', error);
    throw error;
  }

  const orderData = {
    _type: 'order',
    _id: `order-${uuidv4()}`,
    user: {
      _type: 'reference',
      _ref: userId,
      _key: userId
    },
    orderNumber: session.metadata?.orderNumber || '',
    customerName: customerName,
    email: session.customer_email || session.customer_details?.email || '',
    total: session.amount_total ? session.amount_total / 100 : 0,
    status: session.payment_status === 'paid' ? 'paid' : 'pending',
    stripeId: session.id,
    invoiceId: invoice?.id || '',
    invoiceNumber: invoice?.number || '',
    invoiceUrl: invoice?.hosted_invoice_url || '',
    invoicePdf: invoice?.invoice_pdf || '',
    items: session.metadata?.items ? JSON.parse(session.metadata.items) : [],
    createdAt: new Date().toISOString(),
  };

  try {
    await backendClient.create(orderData);
    console.log('Order created successfully in Sanity');
  } catch (error) {
    console.error('Error creating order in Sanity:', error);
    throw error;
  }
}

