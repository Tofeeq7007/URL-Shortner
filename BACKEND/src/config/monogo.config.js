import mongoose from "mongoose";
import dotenv from "dotenv";
// const connectDB = mongoose.connect("mongodb+srv://Tofeeq:FOGbAKbOWfUuUYdg@cluster0.zc9a8af.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

dotenv.config()
// console.log(process.env.MONGO_URL);

const connectDb = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
    }
    catch(e){
        console.error("MongoDB connection failed" ,e.message );
        process.exit(1);
    }
};
export default connectDb;