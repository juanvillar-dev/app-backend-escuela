import { Router } from "express";
import { MateriaService } from "../../domain/service/materia.service";
import { MateriaPrismaRepository } from "../../infrastructure/repositories/prisma/materia.prisma.repository";
import { MateriaController } from "./materia.controller";

export class MateriaRouter {
    static get routes(): Router {
        const router = Router();

        const repositorio   = new MateriaPrismaRepository();
        const service       = new MateriaService(repositorio);
        const controller    = new MateriaController(service);

        router.get      ("/"        , controller.findAll        );
        router.get      ("/:id"     , controller.findById       );
        router.post     ("/"        , controller.create         );
        router.put      ("/:id"     , controller.update         );
        router.patch    ("/:id"     , controller.patch          );
        router.delete   ("/:id"     , controller.deleteById     );
        router.get      ("/areas/lista/"  , controller.getAreas       );

        return router;
    }
}