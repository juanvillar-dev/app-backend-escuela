import { Router } from "express";
import { AlumnoPrismaRepository } from "../../infrastructure/repositories/prisma/alumno.prisma.repository";
import { AlumnoService } from "../../domain/service/alumno.service";
import { AlumnoController } from "./alumno.controller";

export class AlumnoRouter {
    static get routes(): Router {
        const router = Router();

        const repositorio = new AlumnoPrismaRepository();
        const service = new AlumnoService(repositorio);
        const controller = new AlumnoController(service);

        router.get      ("/"        , controller.findAll        );
        router.get      ("/:id"     , controller.findById       );
        router.post     ("/"        , controller.create         );
        router.put      ("/:id"     , controller.update         );
        router.patch    ("/:id"     , controller.patch          );
        router.delete   ("/:id"     , controller.deleteById     );

        return router;
    }
}