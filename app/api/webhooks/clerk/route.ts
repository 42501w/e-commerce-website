import { createSanityUser } from "@/sanity/helpers/userOperations";

export async function POST(req: Request) {
  const token = req.headers.get("authorization");

  // You can customize the token value and logic here
  if (!token || token !== `Bearer ${process.env.MY_SECRET_TOKEN}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const payload = await req.json();

    // Optionally call your user creation logic
    await createSanityUser(payload);

    return new Response("Webhook handled successfully", { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
