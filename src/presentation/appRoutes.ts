import { Router } from "express";
import { UsuarioRouter } from "./usuario/usuario.route";
import { MateriaRouter } from "./materia/materia.route";
import { GradoRouter } from "./grado/grado.route";
import { AlumnoRouter } from "./alumno/alumno.route";
import { DocenteRouter } from "./docente/docente.route";
import { SeccionRouter } from "./serccion/seccion.route";


export class AppRoutes {
    
    static get getRoutes(): Router{
        const router = Router();

        router.use('/usuarios'  , UsuarioRouter .routes);
        router.use('/materias'  , MateriaRouter .routes);
        router.use('/grados'    , GradoRouter   .routes);
        router.use('/alumnos'   , AlumnoRouter  .routes);
        router.use('/docentes'  , DocenteRouter .routes);
        router.use('/secciones' , SeccionRouter .routes);

        return router;
    }
}