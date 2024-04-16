import mongoose from 'mongoose';

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO!); // El '!' es un Non-null assertion operator, asegurándose que MONGO no es null/undefined.
    connection.isConnected = db.connections[0].readyState;
    console.log("moongose connected")
  } catch (error) {
    console.error(error);
    throw new Error("Failed to connect to MongoDB");
  }
};
