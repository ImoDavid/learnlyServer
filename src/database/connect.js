import mongoose from "mongoose";

const connectToDB = async (url) => {
    try {
        return await mongoose.connect(url);
    } catch (error) {
        console.error(`Database Error: `, error.message);
        //exit process if there is error connecting to database.
        process.exit(1);
    }
}

export default connectToDB;