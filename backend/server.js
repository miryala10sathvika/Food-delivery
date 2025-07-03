import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartrouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import 'dotenv/config.js';

//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors());

//db connection

connectDB();


//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", cartrouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("uploads"));

app.get("/",(req,res)=>{
    res.send("Hello World!");
})


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})


//mongodb+srv://miryalasathvika:hhHymBwvh3ePHHfH@cluster0.snmrt3o.mongodb.net/?
