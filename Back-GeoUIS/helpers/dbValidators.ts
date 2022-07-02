import Rol from "../models/rol.mdl";
import Usuario from "../models/usuario.mdl";


export const validarRol = async(rol = '') => {
    const existeRol = await Rol.findByPk(rol);
    if(!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

export const validarCorreoExiste = async(correo = '') => {
    const correoExiste = await Usuario.findOne({where: {correo}})
    if(correoExiste) {
        throw new Error(`El correo ${correo} ya está registrado en la BD`)
    }
}

export const existeUsuarioPorID = async(id: number) => {
    const usuario = await Usuario.findByPk(id);
        if(!usuario){
                throw new Error('No existe un usuario con ese ID' + id)
        }
}