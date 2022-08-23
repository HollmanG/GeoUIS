import { Router } from "express";
import { puedePrestar, esAdmin } from '../middlewares/validar-roles';
import { validarCampos } from '../middlewares/validarCampos';
import { postPrestamo, putPrestamo, getDisponible } from '../controllers/prestamo.ctrl';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.post('/', [
    validarJWT,
    puedePrestar, 
    validarCampos
], postPrestamo);

router.post('/:id', [
    validarJWT,
    esAdmin, 
    validarCampos
], putPrestamo);

router.get('/:id', getDisponible);


export default router;