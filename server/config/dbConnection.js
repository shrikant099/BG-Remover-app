import mongoose from "mongoose";

const dataBaseConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database Connection Succesfull`);
  } catch (error) {
    console.log(`MongoDb Connnection Error: ${error}`);
    process.exit(1);
  }
};

export default dataBaseConnection
