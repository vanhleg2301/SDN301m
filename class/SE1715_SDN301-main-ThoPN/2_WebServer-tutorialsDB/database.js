import mongoose from "mongoose";

const connectDB = () => {
  try {
    const connection = mongoose.connect(process.env.URI_MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to MongoDB success");
    return connection;
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default connectDB;
