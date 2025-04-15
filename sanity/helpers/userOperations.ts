import {client} from "@/sanity/lib/client";
import { jwtVerify } from "jose";

// Type definitions
interface SanityUser {
  _type: "user";
  name: string;
  email: string;
  userId: string;
  image?: string;
  createdAt: string;
}

interface TokenPayload {
  userId: string;
  name: string;
  email: string;
  image?: string;
}

/**
 * Verify JWT token and extract user data with proper type checking
 */
export const verifyToken = async (token: string): Promise<TokenPayload> => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    // Type assertion with runtime validation
    if (typeof payload !== 'object' || payload === null) {
      throw new Error("Invalid token payload");
    }

    const { userId, name, email, image } = payload as {
      userId?: string;
      name?: string;
      email?: string;
      image?: string;
    };

    if (!userId || !name || !email) {
      throw new Error("Missing required user fields in token");
    }

    return { userId, name, email, image };
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
};

/**
 * Create or retrieve a user in Sanity
 */
export const createSanityUser = async (token: string): Promise<SanityUser> => {
  try {
    // Verify token and extract user data
    const { userId, name, email, image } = await verifyToken(token);

    // Check if user already exists
    const existingUser = await client.fetch<SanityUser | null>(
      `*[_type == "user" && userId == $userId][0]`,
      { userId }
    );

    if (existingUser) {
      return existingUser;
    }

    // Create new user document
    const userDoc: SanityUser = {
      _type: "user",
      name,
      email,
      userId,
      image,
      createdAt: new Date().toISOString(),
    };

    return await client.create(userDoc);
  } catch (error) {
    console.error("Error creating Sanity user:", error);
    throw error;
  }
};

/**
 * Get user from Sanity by ID
 */
export const getUserById = async (userId: string): Promise<SanityUser | null> => {
  try {
    if (!userId) throw new Error("User ID is required");

    return await client.fetch<SanityUser | null>(
      `*[_type == "user" && userId == $userId][0]`,
      { userId }
    );
  } catch (error) {
    console.error("Error fetching Sanity user:", error);
    throw error;
  }
};

/**
 * Get user by token
 */
export const getUserByToken = async (token: string): Promise<SanityUser | null> => {
  try {
    const { userId } = await verifyToken(token);
    return await getUserById(userId);
  } catch (error) {
    console.error("Error getting user by token:", error);
    throw error;
  }
};