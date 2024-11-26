import express from 'express';
import { createComplaint, deleteComplaint, getComplaints, updateComplaint } from '../controllers/user_admin.js';
import { isAuthenticated } from '../middlewares/authMiddler.js';

const app = express.Router();

// Create a new complaint
app.post('/complaint', isAuthenticated, createComplaint)

// get all complaints
app.get('/complaint', getComplaints)

// update a complaint
app.put('/complaint/:id', updateComplaint)

// delete a complaint
app.delete("/complaint/:id", deleteComplaint);


export default app;