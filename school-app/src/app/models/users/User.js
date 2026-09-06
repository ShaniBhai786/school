import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        isActive: {
            type: Boolean,
            required: true
        },
        subscription: {
            type: String,
            enum: ["free", "premium"],
            required: true,
            default: "free"
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
        },

        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },

        contact: {
            type: String,
            required: [true, "Contact number is required"],
            trim: true,
        },

        instituteName: {
            type: String,
            required: [true, "Institute name is required"],
            trim: true,
        },

        logo: {
            type: String,
            default: null,
        },
        userRole: {
            type: String,
            enum: ["admin", "teacher"],
            default: "admin",
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        refreshToken: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};


export const User = mongoose.models.User || mongoose.model("User", userSchema);