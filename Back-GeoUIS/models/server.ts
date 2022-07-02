import express, {Application} from "express";
import userRoutes from "../routes/usuario.rt";
import authRoutes from "../routes/auth.rt";
import cors from "cors";
import db from "../db/connection";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        //Conección a la base de datos
        this.dbConnection();

        //Middlewares
        this.middlewares();

        //Definir las rutas
        this.routes();

    }

    async dbConnection() {

        try {

            await db.authenticate();
            console.log('Base de Datos en linea');
            

        } catch (error: any) {
            throw new Error(error);
        }

    }

    middlewares(){
        //CORS
        this.app.use(cors());
        //Lectura del body
        this.app.use(express.json());
        //Carpeta pública
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }

}

export default Server;