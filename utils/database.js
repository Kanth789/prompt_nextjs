import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("connected");
  }
  try {
    await mongoose.connect(process.env.MOGODB_URI, {
      dbName: "PROMPT_WEBSITE",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    isConnected = true;
  } catch (err) {
    console.log(err);
  }
};

// mongodb+srv://luckykirankanth789:<password>@cluster0.yiphqyt.mongodb.net/

