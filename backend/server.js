import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import connectToDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`)
})