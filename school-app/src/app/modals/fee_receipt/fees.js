import mongoose from "mongoose"

const feeSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        trim: true,
        index: true
    },
    studentId: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    class: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    fee: {
        type: Number,
        required: true,
    },
    pending: {
        type: Number,
    },
    balance: {
        type: Number,
    },
    testfee: {
        type: Number,
    },
    others: {
        type: Number,
    },
    month: {
        type: String,
    },
    date: {
        type: String,
    },
    total: {
        type: Number,
    },
}, {timestamps: true})

feeSchema.pre("save", function(next){
    this.total = (this.fee || 0) + (this.pending || 0) + (this.testfee || 0) + (this.others || 0) - (this.balance || 0)
    next();
})

export const Fee = mongoose.model("Fee", feeSchema)