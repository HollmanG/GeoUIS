import { Router } from "express";
import { check } from "express-validator";
import { login, revalidarToken } from "../controllers/auth.ctrl";
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.post('/login', [
    check('correo', 'El correo no es válido').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],
login);

router.get('/renew', validarJWT, revalidarToken);



export default router;