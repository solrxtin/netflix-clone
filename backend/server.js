import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import movieRoutes from "./routes/movie.routes.js"
import tvRoutes from "./routes/tv.routes.js"
import searchRoutes from "./routes/search.routes.js"
import connectToDB from "./config/db.js";
import { protectRoute } from "./middlewares/protectRoute.js";

dotenv.config();

const PORT = process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(cookieParser());


app.use("/api/v1/auth", protectRoute, authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server running on port ${PORT}`)
})