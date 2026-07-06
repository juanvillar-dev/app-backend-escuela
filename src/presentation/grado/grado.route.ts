import { Router } from "express";
import { GradoController } from "./grado.controller";
import { GradoPrismaRepository } from "../../infrastructure/repositories/prisma/grado.prisma.repository";
import { GradoService } from "../../domain/service/grado.service";

export class GradoRouter {
    static get routes(): Router{
        const router = Router();

        const repositoy     = new GradoPrismaRepository();
        const service       = new GradoService(repositoy);
        const controller    = new GradoController(service);

        router.get      ("/"        , controller.findAll    );
        router.get      ("/:id"     , controller.findById   );
        router.post     ("/"        , controller.create     );
        router.put      ("/:id"     , controller.update     );
        router.patch    ("/:id"     , controller.patch      );
        router.delete   ("/:id"     , controller.deleteById);

        return router;
    }
}