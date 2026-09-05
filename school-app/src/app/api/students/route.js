import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Student } from "../../models/users/Students";
import cloudinary from "../../lib/cloudinary";

// GET ALL STUDENTS
export async function GET() {
  try {
    await connectDB();

    const students = await Student.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      students,
    });

  } catch (error) {
    console.error("GET STUDENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}


// POST NEW STUDENT
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const fatherName = formData.get("fatherName");
    const studentId = formData.get("studentId");
    const studentClass = formData.get("class");
    const contact = formData.get("contact");
    const Bform = formData.get("Bform");
    const CNIC = formData.get("CNIC");
    const religion = formData.get("religion");
    const group = formData.get("group");
    const address = formData.get("address");
    const avatar = formData.get("avatar");
    const fee = formData.get("fee");

    if (
      !fullName ||
      !fatherName ||
      !studentId ||
      !studentClass ||
      !fee ||
      !contact ||
      !Bform ||
      !CNIC ||
      !religion ||
      !group ||
      !address ||
      !avatar
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    // FILE BUFFER
    const bytes = await avatar.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // BASE64
    const base64Image = `data:${avatar.type};base64,${buffer.toString(
      "base64"
    )}`;

    // CLOUDINARY
    const uploadedImage = await cloudinary.uploader.upload(base64Image, {
      folder: "students",
    });

    // SAVE STUDENT
    const student = await Student.create({
      fullName,
      fatherName,   // 👈 required
      studentId,
      class: studentClass,
      contact,
      Bform,
      CNIC,         // 👈 required
      religion,
      group,
      address,
      avatar: uploadedImage.secure_url,
      fee: parseFloat(fee),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Student enrolled successfully",
        student,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("STUDENT CREATE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}