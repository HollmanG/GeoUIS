import { Router } from "express";
import { getDepartamentos, getMunicipios, getMunicipiosPorDpto } from '../controllers/departamento_municipio.ctrl';

const router = Router();

router.get('/departamentos', getDepartamentos);

router.get('/municipios', getMunicipios);

router.get('/municipios/:id_departamento', getMunicipiosPorDpto);

export default router;