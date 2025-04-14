import { connectToDatabase } from "@/dbConfig/dbConfig";    
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(request: NextRequest) {
  try {
    // Ensure database connection
    await connectToDatabase();

    // Parse incoming request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Log incoming request (remove in production)
    console.log(reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error: any) {
    console.error("Error occurred during user sign-up:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
