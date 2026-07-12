import { Request, Response } from "express";
import { Controller } from "../base.controller";

import { CreateSeccionDTO } from "../../domain/dto/seccion/create-seccion.dto";
import { UpdateSeccionDTO } from "../../domain/dto/seccion/update-seccion.dto";
import { PatchSeccionDTO } from "../../domain/dto/seccion/patch-seccion.dto";
import { AddAlumnoToSeccionDTO } from "../../domain/dto/seccion/add-alumno-to-seccion.dto";
import { AddAlumnosToSeccionDTO } from "../../domain/dto/seccion/add-alumnos-to-seccion.dto"; // 👈 nuevo DTO
import { SeccionEntity } from "../../domain/entities/compuestas/seccion.entity";
import { SeccionService } from "../../domain/service/seccion.service";
import { AddHorariosToSeccionDTO } from "../../domain/dto/seccion/add-horarios-to-seccion.dto";

export class SeccionController 
extends Controller<SeccionEntity, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO> {

    constructor(service: SeccionService) {
        super(service, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO);
    }
    
    /**
     * Endpoint para obtener detalle completo de una sección
     * GET /secciones/:id/detalle
     */
    public findByIdDetalle = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            const resultado = await (this.service as SeccionService).findByIdDetalle(id);

            if (!resultado) {
                return res.status(404).json({ message: "Sección no encontrada" });
            }

            res.json(resultado);
        } catch (err) {
            res.status(500).json({ message: "Error interno", error: err });
        }
    }




    public addHorarios = async (req: Request, res: Response) => {
        try {
            const dto = AddHorariosToSeccionDTO.create({
                seccionId: req.body.seccionId,
                horarios: req.body.horarios
            });
            const resultado = await (this.service as SeccionService).addHorarios(dto);
            res.json(resultado);
        } catch (err) { this.handleError(err, res); }
    }

    /**
     * Endpoint para agregar VARIOS alumnos a la sección
     * POST /secciones/:id/alumnos
     */
    public addAlumnos = async (req: Request, res: Response) => {
        try {
            const dto = AddAlumnosToSeccionDTO.create({
                seccionId: req.body.seccionId,
                alumnosIds: req.body.alumnosIds
            });
            const resultado = await (this.service as SeccionService).addAlumnos(dto);
            res.json(resultado);
        } catch (err) { this.handleError(err, res); }
    }








    /**
     * Endpoint para agregar UN alumno a la sección
     * POST /secciones/:id/alumnos/uno
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

}
