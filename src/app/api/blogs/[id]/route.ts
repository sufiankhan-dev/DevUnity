import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid blog ID format" },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("blogs");

    const blog = await collection.findOne({ _id: new ObjectId(id) });

    if (blog) {
      return NextResponse.json(blog);
    } else {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred while fetching the blog post",
      },
      { status: 500 }
    );
  }
}
