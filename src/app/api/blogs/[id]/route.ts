import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Invalid blog ID" },
      { status: 400 }
    );
  }

  try {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      _id: blog.id,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      avatar: blog.avatar,
      date: blog.createdAt,
    });
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
