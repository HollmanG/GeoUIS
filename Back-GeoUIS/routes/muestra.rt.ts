import { Router } from "express";
import { getMuestra, getMuestras } from "../controllers/muestra.ctrl";

const router = Router();

router.get('/', getMuestras);

router.get('/:id', getMuestra);

export default router;