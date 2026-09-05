import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Student } from "@/app/models/users/Students";

export async function GET(req, context) {
    try {

        await connectDB();

        const { studentId } = await context.params;

        const student = await Student.findOne({
            studentId,
        });

        if (!student) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Student not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            student,
        });

    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}