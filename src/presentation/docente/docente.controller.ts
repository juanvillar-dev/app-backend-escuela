import { Request, Response } from "express";
import { CreateDocenteDTO } from "../../domain/dto/docente/create-docente.dto";
import { PatchDocenteDTO } from "../../domain/dto/docente/patch-docente.dto";
import { UpdateDocenteDTO } from "../../domain/dto/docente/update-docente.dto";
import { DocenteEntity } from "../../domain/entities/compuestas/docente.entity";
import { DocenteService } from "../../domain/service/docente.service";
import { Controller } from "../base.controller";

export class DocenteController 
extends Controller<DocenteEntity, CreateDocenteDTO, UpdateDocenteDTO, PatchDocenteDTO>
{
    constructor(service: DocenteService){
        super(service, CreateDocenteDTO, UpdateDocenteDTO, PatchDocenteDTO);
    }



        /**
     * Endpoint para obtener la lista de horarios de un docente
     * GET /docentes/:id/horarios
     */
    public getHorarios = async (req: Request, res: Response) => {
        try {
            const docenteId = +req.params.id;
            const resultado = await (this.service as DocenteService).getHorariosDocente(docenteId);

            res.json(resultado);
        } catch (err) {
            this.handleError(err, res);
        }
    }

}