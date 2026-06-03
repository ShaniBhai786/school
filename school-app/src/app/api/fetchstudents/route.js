import { NextResponse } from "next/server";
import clientPromise from "../../lib/mongodb";

// GET all students
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("uniSoft"); // change DB name if needed

    const students = await db.collection("students").find({}).toArray();

    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST new student
export async function POST(req) {
  try {
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("unisoft");

    const result = await db.collection("students").insertOne(body);

    return NextResponse.json({
      message: "Student added",
      id: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add student" },
      { status: 500 }
    );
  }
}