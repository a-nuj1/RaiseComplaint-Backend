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
  origin: [
    "http://localhost:5173", 
    "http://localhost:4173", 
    "https://your-frontend.vercel.app",
    process.env.CORS_ORIGIN
  ],
  credentials: true,
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



