import mongoose from 'mongoose'

const DB_NAME = 'form'

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log("Database Succesfully Connected...")
        console.log(`\nDB Host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("Error Connecting database: ",error)
        process.exit(1)
    }
}

export default connectDB;