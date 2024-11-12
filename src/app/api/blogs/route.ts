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

// export async function GET() {
//   try {
//     const db = await connectToDatabase();
//     const collection = db.collection("blogs");

//     const blogs = await collection.find().sort({ date: -1 }).toArray();

//     return NextResponse.json(blogs);
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return NextResponse.error();
//   }
// }

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathSegments = url.pathname.split("/");

  if (pathSegments.length === 4 && pathSegments[2] === "blogs") {
    const blogId = pathSegments[3];

    try {
      const db = await connectToDatabase();
      const collection = db.collection("blogs");

      const blog = await collection.findOne({ _id: new ObjectId(blogId) });

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
  } else if (url.pathname === "/api/blogs") {
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

  return NextResponse.json(
    { success: false, error: "Not found" },
    { status: 404 }
  );
}
