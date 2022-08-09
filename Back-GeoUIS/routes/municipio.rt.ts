import { Router } from "express";
import {getMunicipio, getMunicipios} from '../controllers/municipio.ctrl';

const router = Router();

router.get('/', getMunicipios);

router.get('/:id', getMunicipio);

export default router;