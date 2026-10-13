import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      process.env.MONGO_URL ||
        "mongodb+srv://smitanimmi_db_user:gbvrhEY60gkeBltn@cluster0.jakfxk8.mongodb.net/fooddelivery?appName=Cluster0"
    )
    .then(() => console.log("mongoDB Connected"));
};
