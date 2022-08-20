import { Router } from "express";
import {getMunicipio, getMunicipios, getTipoMuestra, getUbicaciones} from '../controllers/filtros.ctrl';

const router = Router();

router.get('/municipios', getMunicipios);

router.get('/municipios/:id', getMunicipio);

router.get('/tiposMuestra', getTipoMuestra);

router.get('/ubicaciones', getUbicaciones);

export default router;