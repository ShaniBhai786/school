import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    studentId: {
        type: String,
        required: true,
        trim: true,
    },
    class: {
        type: String,
        required: true,
        trim: true,
    },
    contact: {
        type: String,
        required: true,
        trim: true,
    },
    Bform: {
        type: String,
        required: true,
        trim: true,
    },
    group: {
        type: String,
        enum: ["arts", "science-computer", "science-biology"],
        required: true,
        trim: true,
    },
    religion: {
        type: String,
        enum: ["muslim", "christian"],
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    avatar: {
        type: String,
        // required: true,
    },
},{timestamps: true})


export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema) 