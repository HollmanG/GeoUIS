import { Request, Response } from "express"

export const putPassword = (req: Request, res: Response, next: any) => {
    
    const password = req.body.password;
    if(!password) {
        return res.status(400).json({
            ok: false,
            msg: 'La contraseña es obligatoria'
        });
    } else if(password.split('').length < 6 ) {
        return res.status(400).json({
            ok: false,
            msg: 'La contraseña debe ser mayor a 6 caracteres'
        });
    }

    next();

}