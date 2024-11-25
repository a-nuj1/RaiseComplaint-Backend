import mongoose, {Schema} from "mongoose";

const complaintSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"], // Priority levels
        default: "Low",
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Resolved"], // Status options
        default: "Pending",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
    },


},{timestamps:true});

const Complaint = mongoose.model("Complaint", complaintSchema);

export default Complaint;