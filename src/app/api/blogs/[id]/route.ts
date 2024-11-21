import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  // Validate ObjectId
  if (!ObjectId.isValid(id)) {
    return NextResponse.json(
      { success: false, error: "Invalid blog ID format" },
      { status: 400 }
    );
  }

  try {
    const db = await connectToDatabase();
    const collection = db.collection("blogs");

    // Fetch blog by ObjectId
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

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const pathSegments = url.pathname.split("/");

//   if (pathSegments.length === 4 && pathSegments[2] === "blogs") {
//     const blogId = pathSegments[3];

//     // Validate ObjectId
//     if (!ObjectId.isValid(blogId)) {
//       return NextResponse.json(
//         { success: false, error: "Invalid blog ID format" },
//         { status: 400 }
//       );
//     }

//     try {
//       const db = await connectToDatabase();
//       const collection = db.collection("blogs");

//       // Fetch blog by ObjectId
//       const blog = await collection.findOne({ _id: new ObjectId(blogId) });

//       if (blog) {
//         return NextResponse.json(blog);
//       } else {
//         return NextResponse.json(
//           { success: false, error: "Blog post not found" },
//           { status: 404 }
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching blog post:", error);
//       return NextResponse.json(
//         {
//           success: false,
//           error: "An error occurred while fetching the blog post",
//         },
//         { status: 500 }
//       );
//     }
//   } else if (url.pathname === "/api/blogs") {
//     try {
//       const db = await connectToDatabase();
//       const collection = db.collection("blogs");

//       const blogs = await collection.find().sort({ date: -1 }).toArray();
//       return NextResponse.json(blogs);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       return NextResponse.error();
//     }
//   }

//   return NextResponse.json(
//     { success: false, error: "Not found" },
//     { status: 404 }
//   );
// }
