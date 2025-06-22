import app from "./app";
import mongoose from "mongoose";

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(`mongodb://localhost:27017/library-management`);
    console.log("connected to mongodb using mongoose");
    app.listen(PORT, () => {
      console.log(`App is listing on PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
