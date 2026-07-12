import { AddAlumnoToSeccionDTO } from "../dto/seccion/add-alumno-to-seccion.dto";
import { AddAlumnosToSeccionDTO } from "../dto/seccion/add-alumnos-to-seccion.dto";
import { AddHorariosToSeccionDTO } from "../dto/seccion/add-horarios-to-seccion.dto";
import { CreateSeccionDTO } from "../dto/seccion/create-seccion.dto";
import { SeccionDetalleDTO } from "../dto/seccion/details-secction.dto";
import { GenerateHistorialDTO } from "../dto/seccion/generete-historial-dto";
import { PatchSeccionDTO } from "../dto/seccion/patch-seccion.dto";
import { UpdateSeccionDTO } from "../dto/seccion/update-seccion.dto";
import { SeccionEntity } from "../entities/compuestas/seccion.entity";
import { Repository } from "./repository";

export interface SeccionRepository 
extends Repository<SeccionEntity, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO>
{
    findByIdDetalle(id: number): Promise<SeccionDetalleDTO | null>;

    addAlumnos(dto: AddAlumnosToSeccionDTO): Promise<void>;

    addAlumno(dto: AddAlumnoToSeccionDTO): Promise<void>;
    
    generateHistorial(dto: GenerateHistorialDTO): Promise<void>;

    addHorarios(dto: AddHorariosToSeccionDTO): Promise<void>;
}