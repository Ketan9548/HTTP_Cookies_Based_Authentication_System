import mongoose from 'mongoose';
import 'dotenv/config';

export const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
            .then(() => console.log('Connected to MongoDB...'))
            .catch((error) => console.error('Error connecting to MongoDB:', error));
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};