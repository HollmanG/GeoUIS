import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.ctrl";
import { validarCampos } from '../middlewares/validarCampos';

const router = Router();

router.post('/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
login);



export default router;