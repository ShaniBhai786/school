// app/api/fees/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { Fee } from "../../models/Fee";

export async function POST(req) {
    await connectDB();

    const body = await req.json();

    const fee = await Fee.create(body);

    return NextResponse.json({
        success: true,
        fee,
    });
}