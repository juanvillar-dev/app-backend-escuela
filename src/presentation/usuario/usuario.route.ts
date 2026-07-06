import { Router } from "express";
import { UsuarioService } from "../../domain/service/usuario.service";
import { UsuarioController } from "./usuario.controller";
import { UsuarioPrismaRepository } from "../../infrastructure/repositories/prisma/usuario.prisma.repository";

export class UsuarioRouter {
    static get routes(): Router {
        const router = Router();

        const repositorio   = new UsuarioPrismaRepository();
        const service       = new UsuarioService(repositorio);
        const controller    = new UsuarioController(service);

        router.get      ("/"        , controller.findAll    );
        router.get      ("/:id"     , controller.findById   );
        router.post     ("/"        , controller.create     );
        router.put      ("/:id"     , controller.update     );
        router.patch    ("/:id"     , controller.patch      );
        router.delete   ("/:id"     , controller.deleteById );

        return router;
    }   
}