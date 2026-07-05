import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected"),
    );
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("Please check back later");
    }
  }
};

export default connectDB;
