import mongoose from "mongoose"

const feeSchema = new mongoose.Schema({
    name: {
        type: String,
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
    payment: {
        type: Number,
        required: true,
    },
}, {timestamps: true})

feeSchema.pre("save", function () {

    const total =
        (this.fee || 0) +
        (this.testfee || 0) +
        (this.others || 0);

    const payment = this.payment || 0;

    this.total = total;

    if (payment >= total) {
        this.pending = 0;
        this.balance = payment - total;
    } else {
        this.pending = total - payment;
        this.balance = 0;
    }
});

export const Fee = mongoose.models.Fee || mongoose.model("Fee", feeSchema);