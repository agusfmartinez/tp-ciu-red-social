import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Falta MONGODB_URI en .env');
};

export const app = express();
app.use(cors());
app.use(express.json());

app.listen(PORT, async ()=> {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Server running on http://localhost:${PORT}`)
    } catch (error) {
        console.error("No se pudo conectar con la base de datos:", error);
    }
});