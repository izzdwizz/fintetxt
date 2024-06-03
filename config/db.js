import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();


async function connectDB(){
    try{
      const dbURI = process.env.MONGODB_URI;
      await mongoose.connect(dbURI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true
      });
      console.log('Connected to MongoDB');
    }catch(error){
        console.log('Error connecting to MongoDB',error);
        throw error;
    }
}
export default connectDB;