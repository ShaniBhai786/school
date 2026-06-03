import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    userRole: {
        type: String,
        enum: ["teacher", "admin"],
        required: true
    },
    refreshToken: {
        type: String,
    }
},{timestamps: true})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) {
        return next()
    }
    else{
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema) 