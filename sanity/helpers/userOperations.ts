import { sanityClient } from "@/sanity/lib/client";
import { User } from "@clerk/nextjs/server";

export const createSanityUser = async (clerkUser: User) => {
  try {
    // Check if user already exists
    const existingUser = await sanityClient.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId: clerkUser.id }
    );

    if (existingUser) {
      return existingUser;
    }

    // Create new user document
    const userDoc = {
      _type: "user",
      name: clerkUser.firstName + " " + clerkUser.lastName,
      email: clerkUser.emailAddresses[0].emailAddress,
      clerkId: clerkUser.id,
      image: clerkUser.imageUrl,
      createdAt: new Date().toISOString(),
    };

    const createdUser = await sanityClient.create(userDoc);
    return createdUser;
  } catch (error) {
    console.error("Error creating Sanity user:", error);
    throw error;
  }
};

export const getUserByClerkId = async (clerkId: string) => {
  try {
    const user = await sanityClient.fetch(
      `*[_type == "user" && clerkId == $clerkId][0]`,
      { clerkId }
    );
    return user;
  } catch (error) {
    console.error("Error fetching Sanity user:", error);
    throw error;
  }
}; 