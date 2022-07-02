import { Request, Response } from "express"

export const putPassword = (req: Request, res: Response, next: any) => {
    
    const password = req.body.password;
    if(!password) {
    } else if(password.split('').length < 6 ) {
        return res.status(400).json({msg: 'La contraseña debe ser mayor a 6 caracteres'});
    }

    next();

}