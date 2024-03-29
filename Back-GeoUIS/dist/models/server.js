"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_rt_1 = __importDefault(require("../routes/usuario.rt"));
const auth_rt_1 = __importDefault(require("../routes/auth.rt"));
const filtros_1 = __importDefault(require("../routes/filtros"));
const muestra_rt_1 = __importDefault(require("../routes/muestra.rt"));
const prestamo_rt_1 = __importDefault(require("../routes/prestamo.rt"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.apiPaths = {
            usuarios: '/api/usuarios',
            auth: '/api/auth',
            filtros: '/api/filtros',
            muestras: '/api/muestras',
            prestamos: '/api/prestamos'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '8000';
        //Conección a la base de datos
        this.dbConnection();
        //Middlewares
        this.middlewares();
        //Definir las rutas
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('Base de Datos en linea');
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '13mb' }));
        //subir archivos
        this.app.use((0, express_fileupload_1.default)({ createParentPath: true }));
        //Carpeta pública
        this.app.use(express_1.default.static('public'));
        this.app.use("/images", express_1.default.static("storage/uploads/muestras"));
    }
    routes() {
        this.app.use(this.apiPaths.usuarios, usuario_rt_1.default);
        this.app.use(this.apiPaths.auth, auth_rt_1.default);
        this.app.use(this.apiPaths.filtros, filtros_1.default);
        this.app.use(this.apiPaths.muestras, muestra_rt_1.default);
        this.app.use(this.apiPaths.prestamos, prestamo_rt_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ' + this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map