import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { communityProfiles } from "@/db/schema";
import { getSession } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { username, role, description, linkedin, github, profileImageUrl } =
      await req.json();

    if (!role?.trim() || !description?.trim()) {
      return NextResponse.json(
        { message: "Role and description are required" },
        { status: 400 }
      );
    }

    const [existingProfile] = await db
      .select({ id: communityProfiles.id })
      .from(communityProfiles)
      .where(eq(communityProfiles.userId, session.user.id));

    if (existingProfile) {
      return NextResponse.json(
        { message: "Profile already exists" },
        { status: 409 }
      );
    }

    await db.insert(communityProfiles).values({
      userId: session.user.id,
      username: username || session.user.name,
      description,
      role,
      linkedin: linkedin || null,
      github: github || null,
      profileImage: profileImageUrl || session.user.image || null,
    });

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

export async function GET() {
  try {
    const profiles = await db
      .select()
      .from(communityProfiles)
      .orderBy(desc(communityProfiles.createdAt));

    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
