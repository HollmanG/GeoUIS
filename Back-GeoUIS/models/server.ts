import express, {Application} from "express";
import userRoutes from "../routes/usuario.rt";
import authRoutes from "../routes/auth.rt";
import filtrosRoutes from "../routes/filtros";
import muestrasRoutes from "../routes/muestra.rt";
import cors from "cors";
import db from "../db/connection";
import fileUpload from "express-fileupload";

class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/auth',
        filtros: '/api/filtros',
        muestras: '/api/muestras'
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
        this.app.use(express.urlencoded({extended: true, limit: '13mb'}));

        //subir archivos
        this.app.use(fileUpload({createParentPath: true}));  
        //Carpeta pública
        this.app.use(express.static('public'));

        this.app.use("/images", express.static("storage/uploads/muestras"));
    }

    routes() {

        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.auth, authRoutes);
        this.app.use(this.apiPaths.filtros, filtrosRoutes);
        this.app.use(this.apiPaths.muestras, muestrasRoutes);

    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        })
    }

}

export default Server;