import Complaint from "../models/complaint.model.js";
import { sendEmail } from "../utils/sendMails.js";

// Create a new complaint

export const createComplaint = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      priority,
      status: "Pending", // Default status
      user: req.user._id, 
    });

    // Send email to admin
    const adminMail = "anujgupta1532003@gmail.com";
    const subject = `New Complaint Registered: ${complaint.title}`;
    const html = `
      <p>A new complaint has been registered:</p>
      <ul>
        <li><strong>Title:</strong> ${complaint.title}</li>
        <li><strong>Description:</strong> ${complaint.description}</li>
        <li><strong>Category:</strong> ${complaint.category}</li>
        <li><strong>Priority:</strong> ${complaint.priority}</li>
        <li><strong>Status:</strong> ${complaint.status}</li>
      </ul>
      <p>Please log in to the admin panel to review this complaint.</p>
    `;

    await sendEmail(adminMail, subject, html);

    res.status(201).json({
      success: true,
      message: "Complaint created successfully, admin notified.",
      complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating complaint.",
      error: error.message,
    });
  }
};




// Get all complaints
export const getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.status(200).json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update a complaint
export const updateComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    const complaint = await Complaint.findById(id).populate("user");
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // Ensure the complaint has an associated user with an email
    if (!complaint.user || !complaint.user.email) {
      return res.status(400).json({
        success: false,
        message: "Associated user not found or email is missing.",
      });
    }

    // Update the complaint
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    // Email notification
    const userMail = complaint.user.email;
    const subject = `Complaint Status Updated: ${updatedComplaint.title}`;
    const html = `
      <p>Dear ${complaint.user.name},</p>
      <p>The status of your complaint titled "<strong>${updatedComplaint.title}</strong>" has been updated to "<strong>${updatedComplaint.status}</strong>".</p>
      <p>We appreciate your patience and cooperation.</p>
      <p>Regards,</p>
      <p>Anuj Gupta</p>
    `;

    await sendEmail(userMail, subject, html);

    res.status(200).json({
      success: true,
      message: "Complaint updated successfully and user notified.",
      complaint: updatedComplaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating complaint or sending email.",
      error: error.message,
    });
  }
};



// delete a complaint
export const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComplaint = await Complaint.findByIdAndDelete(id);
    if (!deletedComplaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error In Deleting Complaint" || error.message,
    });
  }
};
