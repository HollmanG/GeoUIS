import Usuario from "../models/usuario.mdl"
import Rol from '../models/rol.mdl';

const dbInit = () => {
    Usuario.sync(),
    Rol.sync()
}
export default dbInit 