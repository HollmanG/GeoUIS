import jwt from "jsonwebtoken";

export const generarJWT = (id:number) => {
    const token = jwt.sign({id}, 
        process.env.SECRETORPRIVATEKEY!,
        { expiresIn: '6h' });

    return token;
}