import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { username, role, description, linkedin, github, profileImageUrl } =
      await req.json();

    const db = await connectToDatabase();
    const usersCollection = db.collection("community");

    const newUser = {
      username,
      description,
      role,
      linkedin,
      github,
      profileImage: profileImageUrl,
      createdAt: new Date(),
    };

    await usersCollection.insertOne(newUser);

    return NextResponse.json(
      { message: "Profile saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection("community");

    const users = await usersCollection.find({}).toArray();

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
