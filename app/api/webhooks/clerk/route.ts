import { createSanityUser } from "@/sanity/helpers/userOperations";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(req: Request) {
  const token = req.headers.get("authorization");

  if (!token || token !== `Bearer ${process.env.MY_SECRET_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    // For webhooks requiring raw body verification, use:
    // const rawBody = await req.text();
    // Then verify signature and parse JSON manually
    
    // If no raw body needed, keep using req.json()
    const payload = await req.json();
    
    await createSanityUser(payload);

    return NextResponse.json(
      { message: "Webhook handled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}