import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

export async function POST(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse the request body
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if the password is valid
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create JWT token
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        fullname: user.username // Add the username as fullname
      }, // Payload
      JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Set token in cookies
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: { id: user._id, email: user.email }, // Return user details (excluding sensitive data)
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: false, // Allow client-side access to the token
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/",
      sameSite: "strict",
    });

    console.log("Token set in cookies:", token); // Debug log

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}