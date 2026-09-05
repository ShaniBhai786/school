import { NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { Student } from "../../models/users/Students";
import cloudinary from "../../lib/cloudinary";

export async function POST(req) {
  try {

    await connectDB();

    const formData = await req.formData();

    const fullName = formData.get("fullName");
    const studentId = formData.get("studentId");
    const studentClass = formData.get("class");
    const contact = formData.get("contact");
    const Bform = formData.get("Bform");
    const religion = formData.get("religion");
    const group = formData.get("group");
    const address = formData.get("address");
    const avatar = formData.get("avatar");
    const fee = formData.get("fee");

    if (
      !fullName ||
      !studentId ||
      !studentClass ||
      !fee ||
      !contact ||
      !Bform ||
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

    // CONVERT BUFFER TO BASE64
    const base64Image = `data:${avatar.type};base64,${buffer.toString("base64")}`;

    // UPLOAD TO CLOUDINARY
    const uploadedImage = await cloudinary.uploader.upload(base64Image, {
      folder: "students",
    });

    // SAVE STUDENT
    const student = await Student.create({
      fullName,
      studentId,
      class: studentClass,
      contact,
      Bform,
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

    console.log("CLOUDINARY ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}