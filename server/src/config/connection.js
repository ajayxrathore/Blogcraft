import mongoose from 'mongoose'
import {env} from './env.js'

export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(env.MONGODB_URI)
        console.log('We are now connected to database');
        
    } catch (error) {
        throw new Error("Failed to connect to database",error.message)
    }
}
