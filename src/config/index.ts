import mongoose, { mongo } from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongo db connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("Mongo DB error -> ", err);
      process.exit();
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
