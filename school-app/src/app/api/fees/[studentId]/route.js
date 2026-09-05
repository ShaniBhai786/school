// app/api/fees/[studentId]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Fee } from "../../../models/Fee";

export async function GET(req, { params }) {
    await connectDB();

    const { studentId } = await params;

    const fees = await Fee.find({ studentId }).sort({ date: -1 });

    return NextResponse.json({
        success: true,
        fee: fees[0],
    });
}