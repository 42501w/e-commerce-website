import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userLogoutResponse = NextResponse.json({
      message: "User logged out successfully",
      success: true,
    });

    // set the existing token to empty and expire it
    userLogoutResponse.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
      path: "/",
    });

    // Return the response
    return userLogoutResponse;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
