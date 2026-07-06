import { Request, Response } from "express";
import { SeccionService } from "../../domain/service/seccion.service";
import { Controller } from "../base.controller";

import { CreateSeccionDTO } from "../../domain/dto/seccion/create-seccion.dto";
import { UpdateSeccionDTO } from "../../domain/dto/seccion/update-seccion.dto";
import { PatchSeccionDTO } from "../../domain/dto/seccion/patch-seccion.dto";
import { AddAlumnoToSeccionDTO } from "../../domain/dto/seccion/add-alumno-to-seccion.dto";
import { AddHorarioDTO } from "../../domain/dto/seccion/add-horario-to-seccion.dto";
import { SeccionEntity } from "../../domain/entities/compuestas/seccion.entity";

export class SeccionController 
extends Controller<SeccionEntity, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO> {

    constructor(service: SeccionService) {
        super(service, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO);
    }

    /**
     * Endpoint para agregar alumno a la sección
     * POST /secciones/:id/alumnos
     */
    public addAlumno = async (req: Request, res: Response) => {
        try {
            const dto = new AddAlumnoToSeccionDTO(
                +req.params.id,
                +req.body.alumnoId
            );
            const resultado = await (this.service as SeccionService).addAlumno(dto);
            res.json(resultado);
        } catch (err) { this.handleError(err, res); }
    }

    /**
     * Endpoint para agregar horario a la sección
     * POST /secciones/:id/horarios
     */
    public addHorario = async (req: Request, res: Response) => {
        try {
            const dto = new AddHorarioDTO(
                +req.params.id,
                +req.body.materiaId,
                +req.body.docenteId,
                req.body.diaSemana,
                new Date(req.body.horaInicio),
                new Date(req.body.horaFin)
            );
            const resultado = await (this.service as SeccionService).addHorario(dto);
            res.json(resultado);
        } catch (err) { this.handleError(err, res); }
    }
}
