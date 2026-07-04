import {connectDB} from './config/connection.js'
import app from './app.js';
import {env} from './config/env.js'
import ApiError from './utils/ApiError.js';
const start = async() => {
    try {
        await connectDB();
        app.listen(env.PORT,()=>{
            console.log("Server is running on PORT:", env.PORT);
        })
    } catch (error) {
        throw new ApiError(500,"Error while starting server")
    }
}
start()
