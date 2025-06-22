import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = 5000;

async function main() {
  try {
    // await mongoose.connect(`mongodb://localhost:27017/library-management`);
    console.log("connected to mongodb using mongoose");
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_SECRET_KEY}@cluster0.${process.env.MONGO_DB_URI_SECRET_KEY}.mongodb.net/library-management?retryWrites=true&w=majority&appName=Cluster0`
    );
    app.listen(PORT, () => {
      console.log(`App is listing on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
