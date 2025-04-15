import { createSanityUser } from "@/sanity/helpers/userOperations";
import { NextResponse } from "next/server";

// Runtime & Caching Settings
export const runtime = 'edge'; // or 'nodejs' if needed
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export async function POST(req: Request) {
  // 1. Auth Check
  const token = req.headers.get("authorization");
  if (!token || token !== `Bearer ${process.env.MY_SECRET_TOKEN}`) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Process Payload (use rawBody if verification needed)
    const payload = await req.json(); // or use rawBody approach above
    
    // 3. Business Logic
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