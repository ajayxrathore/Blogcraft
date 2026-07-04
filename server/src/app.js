import express from 'express'
import userRouter from './routes/user.routes.js'
import blogRouter from './routes/blog.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { env } from './config/env.js'
const app = express()
app.use(cors({
    origin: env.CLIENT_URL,
    credentials: true,
  }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)
app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
})
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: err.success ?? false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});


export default app;
