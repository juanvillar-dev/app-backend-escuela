import { Router } from "express";
import { UsuarioRouter } from "./usuario/usuario.route";
import { MateriaRouter } from "./materia/materia.route";
import { GradoRouter } from "./grado/grado.route";
import { AlumnoRouter } from "./alumno/alumno.route";
import { DocenteRouter } from "./docente/docente.route";


export class AppRoutes {
    
    static get getRoutes(): Router{
        const router = Router();

        router.use('/api/usuarios'  , UsuarioRouter .routes);
        router.use('/api/materias'  , MateriaRouter .routes);
        router.use('/api/grados'    , GradoRouter   .routes);
        router.use('/api/alumnos'   , AlumnoRouter  .routes);
        router.use('/api/docentes'  , DocenteRouter .routes);

        return router;
    }
}