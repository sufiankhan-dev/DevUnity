import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function POST(request: NextRequest) {
  const { title, excerpt, content, author, avatar } = await request.json();

  try {
    const result = await pool.query(
      'INSERT INTO "blogs" (title, excerpt, content, author, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, excerpt, content, author, avatar]
    );

    return NextResponse.json(
      { success: true, data: result.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Insertion Error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    const { rows } = await pool.query("SELECT * FROM blogs ORDER BY date DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.error();
  }
}
