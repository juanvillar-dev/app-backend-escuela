import { Router } from "express";
import { SeccionPrismaRepository } from "../../infrastructure/repositories/prisma/seccion.prisma.repository";
import { SeccionService } from "../../domain/service/seccion.service";
import { SeccionController } from "./seccion.controller";



export class SeccionRouter{
    static get routes(): Router{
        const router = Router();

        // Instancias
        const repo          = new SeccionPrismaRepository();
        const service       = new SeccionService    (repo);
        const controller    = new SeccionController (service);

        // CRUD genérico
        router.get      ("/secciones"       , controller.findAll    );
        router.get      ("/secciones/:id"   , controller.findById   );
        router.post     ("/secciones"       , controller.create     );
        router.put      ("/secciones/:id"   , controller.update     );
        router.patch    ("/secciones/:id"   , controller.patch      );
        router.delete   ("/secciones/:id"   , controller.deleteById );

        // Endpoints adicionales
        router.post     ("/secciones/:id/alumnos"   , controller.addAlumno);
        router.post     ("/secciones/:id/horarios"  , controller.addHorario);

        return router;
    }
}
