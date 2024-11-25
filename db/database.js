import mongoose from "mongoose";

const connectDB = async (uri) => {
    try {
        const connectionInstance = await mongoose.connect(uri, {dbName: "RaiseComplaint"});
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MonoDB connection error: ", error);
        process.exit(1);
    }
}

export default connectDB;