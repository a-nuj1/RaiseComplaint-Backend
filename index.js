import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectDB from './db/database.js';
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';

// Load environment variables from .env file
dotenv.config({
    path:'./.env',
  });
  

// create express app
const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;


// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from localhost and the production frontend URL
    const allowedOrigins = [
      "http://localhost:5173", 
      "http://localhost:4173", 
      "https://raise-complaint-backend.vercel.app", // replace with your production URL
      process.env.CORS_ORIGIN // if you set a custom env var for CORS origins
    ];

    if (allowedOrigins.includes(origin) || !origin) { // `!origin` allows for non-browser clients like Postman
      callback(null, true); // Allow the request
    } else {
      callback(new Error("CORS not allowed by this server"));
    }
  },
  credentials: true, // This is important if you're handling cookies or sessions
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // List of allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'] // List of allowed headers
}));


app.use('/api', adminRoutes);
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('Welcome ! Server is up and running.');
});



// connect to MongoDB & listen for requests only if the connection is successful
connectDB(MONGO_URI)
.then(() => {
    app.listen(PORT, ()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection error: ", error);
    process.exit(1);
})



