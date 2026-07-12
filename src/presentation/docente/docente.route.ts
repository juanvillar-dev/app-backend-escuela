import { Router } from "express";
import { DocentePrismaRepository } from "../../infrastructure/repositories/prisma/docente.prisma.repository";
import { DocenteService } from "../../domain/service/docente.service";
import { DocenteController } from "./docente.controller";

export class DocenteRouter {
    static get routes(): Router {
        const router = Router();

        const repositorio   = new DocentePrismaRepository();
        const service       = new DocenteService(repositorio);
        const controller   = new DocenteController(service);

        router.get      ("/"        , controller.findAll        );
        router.get      ("/:id"     , controller.findById       );
        router.post     ("/"        , controller.create         );
        router.put      ("/:id"     , controller.update         );
        router.patch    ("/:id"     , controller.patch          );
        router.delete   ("/:id"     , controller.deleteById     );
        router.get      ("/horarios/:id", controller.getHorarios    );

        return router;
    }
}