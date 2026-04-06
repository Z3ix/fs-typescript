import express from "express";
import { getAll } from "../services/diagnoseServices.ts";
const router = express.Router();

router.get('/', (req, res) => {
    const data = getAll();
    res.json(data);
});

export default router;


