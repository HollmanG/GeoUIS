import { Router } from "express";
import { getMuestra, getMuestras, crearMuestra, editarMuestra } from '../controllers/muestra.ctrl';
import { esAdmin } from "../middlewares/validar-roles";
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/', getMuestras);

router.get('/:id', getMuestra);

router.post('/', [
    validarJWT,
    esAdmin,
    validarCampos],
    crearMuestra);

router.put('/:id', [
    validarJWT,
    esAdmin,
    validarCampos],
    editarMuestra);

export default router;