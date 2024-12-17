import "dotenv/config";
import  authRouter from "./routes/authRoutes.js";
import connectDB from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import useRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials: true}));

//API ENDPOINTS
app.get("/", (req, res) => {
    res.send("API working");
})
app.use('/api/auth',authRouter)
app.use('/api/user',useRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})