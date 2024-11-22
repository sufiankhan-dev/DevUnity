import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  const { title, content, author, avatar } = await request.json();

  try {
    const db = await connectToDatabase();
    const collection = db.collection("blogs");

    const result = await collection.insertOne({
      title,
      content,
      author,
      avatar,
      date: new Date(),
    });

    return NextResponse.json(
      { success: true, data: { id: result.insertedId } },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Insertion Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("blogs");

    const blogs = await collection.find().sort({ date: -1 }).toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.error();
  }
}
