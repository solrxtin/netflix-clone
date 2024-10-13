import { Router } from "express";
import { getSearchHistory, removeItemFromSearchHistory, searchMovie, searchPerson, searchTv } from "../controllers/search.controllers.js";

const router = Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router