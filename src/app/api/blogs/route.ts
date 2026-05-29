import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { getSession } from "@/lib/auth-server";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content } = await request.json();

  if (!title?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "Title and content are required" },
      { status: 400 }
    );
  }

  try {
    const [blog] = await db
      .insert(blogs)
      .values({
        userId: session.user.id,
        title,
        content,
        author: session.user.name,
        avatar: session.user.image ?? "",
      })
      .returning({ id: blogs.id });

    return NextResponse.json(
      { success: true, data: { id: blog.id } },
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
    const posts = await db
      .select()
      .from(blogs)
      .orderBy(desc(blogs.createdAt));

    return NextResponse.json(
      posts.map((post) => ({
        _id: post.id,
        title: post.title,
        content: post.content,
        author: post.author,
        avatar: post.avatar,
        date: post.createdAt,
      }))
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
