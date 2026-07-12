import { Router } from "express";
import { SeccionController } from "./seccion.controller";
import { SeccionPrismaRepository } from "../../infrastructure/repositories/prisma/seccion.prisma.repository";
import { SeccionService } from "../../domain/service/seccion.service";


export class SeccionRouter{
    static get routes(): Router{
        const router = Router();

        // Instancias
        const repo          = new SeccionPrismaRepository();
        const service       = new SeccionService    (repo);
        const controller    = new SeccionController (service);

        // CRUD genérico
        router.get      ("/"      , controller.findAll    );
        router.get      ("/:id"   , controller.findByIdDetalle   );
        router.post     ("/"      , controller.create     );
        router.put      ("/:id"   , controller.update     );
        router.patch    ("/:id"   , controller.patch      );
        router.delete   ("/:id"   , controller.deleteById );

        // Endpoints adicionales
        router.post     ("/add-alumnos" , controller.addAlumnos);
        router.post     ("/add-alumno"  , controller.addAlumno);
        router.post     ("/add-horarios", controller.addHorarios);

        return router;
    }
}
