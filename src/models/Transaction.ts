import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    amount: Number,
    category: String,
    date: {
        type: Date,
        default: Date.now,
    },
    note: String,
});

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);