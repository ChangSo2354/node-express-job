import express from 'express'
import { config} from 'dotenv';
import  userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import locationRoute from './routes/locationRoute.js'
import categoryRoute from './routes/categoryRoute.js'

const server = express(); // create object form express
server.use(express.json());
server.use(cookieParser());
config();

server.use(cors({
    origin: "http://localhost:5173", // your vue dev server
    credentials: true               // allow cookie
}))


server.use("/api",userRoute)
server.use("/api",locationRoute)
server.use("/api",categoryRoute)

const PORT = process.env.PORT || 3000;         // call port from env
const HOST = process.env.HOST || "localhost"; // call host from env

server.listen(PORT, () => {
  console.log(`✅ Server is running on: http://${HOST}:${PORT}`);
});
