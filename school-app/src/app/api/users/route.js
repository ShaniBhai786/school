import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import { User } from "@/app/models/users/User";
import bcrypt from "bcryptjs";
import cloudinary from "@/app/lib/cloudinary";

export async function POST(req) {
    try {
        await connectDB()

        const formData = await req.formData()

        const isActive = formData.get("isActive")
        const subscription = formData.get("subscription")
        const email = formData.get("email")
        const password = formData.get("password")
        const instituteName = formData.get("instituteName")
        const fullName = formData.get("fullName")
        const userRole = formData.get("userROle")
        const contact = formData.get("contact")
        const logo = formData.get("logo")


        const bytes = await logo.arrayBuffer()
        const buffer = Buffer.form(bytes)
        const base64Logo = `data${logo.type};base64,${buffer.toString("base64")}`

        const uploadedLogo = await cloudinary.uploader.upload(base64Logo, {
            folder: "schools/logos"
        })
        if (!uploadedLogo) {
            return NextResponse.json({
                status: 502,
                success: false,
                message: "Cloudinary Upload Failed"
            })
        }

        if (!email || !password || !instituteName || !logo || !contact || !fullName || !userRole || !isActive || !subscription) {
            return NextResponse.json(
                {
                    status: 400,
                    message: "All fields are required!"
                }
            )
        }

        const existingUser = await User.findOne({email})

        if (existingUser) {
            return NextResponse.json({
                message: "User already registered with this email"
            })
        }

        const hashPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            email,
            password: hashPassword,
            instituteName,
            contact,
            fullName,
            userRole,
            isActive,
            subscription,
            logo: uploadedLogo.secure_url
        })

        return NextResponse.json(
            {
                success: true,
                status: 200,
                message: "User Created Successfully!",
                user: {
                    id: user._id
                }
            }
        )

    } catch (error) {
        return NextResponse.json(
            {
                status: 500,
                message: "Error Registring user!",
                error
            }
        )
    }
}