import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'
dotenv.config();

const PORT = process.env.PORT || 5001

const app = express();

//middleware

app.use(
    cors({
        origin: "http://localhost:5173"
    })
);

app.use(express.json());
app.use(rateLimiter);

//app.use(express.urlencoded({ extended: true }));

app.use((req,res,next) =>{
    console.log(`Requested method is ${req.method} & Requested URL is ${req.url}`);
    next();
})


app.use('/api/notes', notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT :", PORT);
    });
})
