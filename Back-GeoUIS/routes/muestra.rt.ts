import { Router } from "express";
import { getMuestra, getMuestras, crearMuestra, editarMuestra, getFotos, agregarFoto, eliminarFoto, eliminarMuestra } from '../controllers/muestra.ctrl';
import { esAdmin } from "../middlewares/validar-roles";
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/', getMuestras);

router.get('/:id', getMuestra);

router.post('/', [
    validarJWT,
    esAdmin,
    validarCampos
], crearMuestra);

router.put('/:id', [
    validarJWT,
    esAdmin,
    validarCampos
], editarMuestra);

router.delete('/:id', [
    validarJWT,
    esAdmin,
    validarCampos
], eliminarMuestra);

router.get('/fotos/:id', getFotos);

router.post('/fotos', [
    validarJWT,
    esAdmin,
    validarCampos
], agregarFoto);

router.delete('/fotos', [
    validarJWT,
    esAdmin,
    validarCampos
], eliminarFoto);

export default router;