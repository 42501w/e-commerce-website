"use server";
import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import Stripe from "stripe";


export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  userId: string; 
}

interface CartItems {
  products: CartItem["product"];
  quantity: number;
}

export async function createCheckoutSession(
  items: CartItem[],
  metadata: Metadata
) {
  try {
    const MAX_AMOUNT = 99999999; // 999,999.99 PKR in paisa
    const MAX_ITEMS_PER_ORDER = 5; // Maximum items per order to keep amounts manageable

    // Split items into smaller chunks if needed
    const orderChunks: CartItem[][] = [];
    let currentChunk: CartItem[] = [];
    let currentAmount = 0;

    for (const item of items) {
      // Calculate amount in paisa
      const itemAmount = Math.round(item.product.price! * 100) * item.quantity;
      
      // If adding this item would exceed the limit, start a new chunk
      if (currentAmount + itemAmount > MAX_AMOUNT || currentChunk.length >= MAX_ITEMS_PER_ORDER) {
        if (currentChunk.length > 0) {
          orderChunks.push([...currentChunk]);
        }
        currentChunk = [];
        currentAmount = 0;
      }

      currentChunk.push(item);
      currentAmount += itemAmount;
    }

    // Add the last chunk if it has items
    if (currentChunk.length > 0) {
      orderChunks.push(currentChunk);
    }

    // If we have multiple chunks, we need to handle them differently
    if (orderChunks.length > 1) {
      // For now, we'll just process the first chunk and inform the user
      // In a production environment, you might want to create multiple sessions
      console.log(`Order split into ${orderChunks.length} parts. Processing first part.`);
      items = orderChunks[0];
    }

    const customers = await stripe.customers.list({
      email: metadata?.customerEmail,
      limit: 1,
    });

    const customerId = customers.data.length > 0 ? customers.data[0].id : "";

    const lineItems = items.map((item) => {
      // Convert price to paisa for Stripe
      const unitAmount = Math.round(item.product.price! * 100);
      
      return {
        price_data: {
          currency: "PKR",
          unit_amount: unitAmount,
          product_data: {
            name: item.product.name || "Unnamed Product",
            description: item.product.description,
            metadata: { id: item.product._id },
            images:
              item.product.images && item.product.images.length > 0
                ? [urlFor(item.product.images[0]).url()]
                : undefined,
          },
        },
        quantity: item.quantity,
      };
    });

    const sessionPayload: Stripe.Checkout.SessionCreateParams = {
      metadata: {
        orderNumber: metadata?.orderNumber,
        customerName: metadata?.customerName,
        customerEmail: metadata?.customerEmail,
        userId: metadata?.userId,
        isSplitOrder: orderChunks.length > 1 ? 'true' : 'false',
        totalParts: orderChunks.length.toString(),
        currentPart: '1',
      },
      mode: "payment",
      allow_promotion_codes: true,
      payment_method_types: ["card"],
      invoice_creation: {
        enabled: true,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={{CHECKOUT_SESSION_ID}}&orderNumber=${metadata?.orderNumber}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
      line_items: lineItems,
      customer: customerId || undefined,
      customer_email: customerId ? undefined : metadata?.customerEmail,
    };

    console.log("Creating checkout session with payload:", {
      ...sessionPayload,
      line_items: lineItems.map(item => ({
        ...item,
        price_data: {
          ...item.price_data,
          unit_amount: item.price_data.unit_amount,
        }
      }))
    });

    const session = await stripe.checkout.sessions.create(sessionPayload);
    return session.url;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
}
