import { Router } from "express";
import { puedePrestar, esAdmin } from '../middlewares/validar-roles';
import { validarCampos } from '../middlewares/validarCampos';
import { postPrestamo, putPrestamo, getDisponible, getPrestamos, getPrestamo } from '../controllers/prestamo.ctrl';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/:id', getDisponible);

router.get('/', [
    validarJWT,
    puedePrestar, 
    validarCampos
], getPrestamos);

router.get('/usuario/:id', getPrestamo);

router.post('/', [
    validarJWT,
    puedePrestar, 
    validarCampos
], postPrestamo);

router.put('/:id', [
    validarJWT,
    esAdmin, 
    validarCampos
], putPrestamo);



export default router;