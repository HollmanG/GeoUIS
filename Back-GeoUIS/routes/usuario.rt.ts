import { Router } from "express";
import { check } from "express-validator";
import { deleteUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controllers/usuario.ctrl";
import { validarCorreoExiste, validarRol, existeUsuarioPorID } from '../helpers/dbValidators';
import { putPassword } from "../middlewares/putPassword";
import { esAdmin } from "../middlewares/validar-roles";
import { validarCampos } from '../middlewares/validarCampos';
import { validarJWT } from "../middlewares/validarJWT";

const router = Router();

router.get('/', getUsuarios);
router.get('/:id', [
    check('id').custom(existeUsuarioPorID),
    validarCampos
], getUsuario);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es válido').isEmail(), 
    check('password', 'La contraseña es obligatoria y debe tener una longitud de más de 6 caracteres').isLength({min: 6}),
    check('correo').custom(validarCorreoExiste),
    check('rol').custom(validarRol),
    validarCampos
],postUsuario);
router.put('/:id', [
    check('id').custom(existeUsuarioPorID),
    check('correo', 'El correo no es válido').isEmail(),
    putPassword,
    validarCampos
], putUsuario);
router.delete('/:id', [
    validarJWT,
    esAdmin,
    check('id').custom(existeUsuarioPorID),
    validarCampos
], deleteUsuario);



export default router;