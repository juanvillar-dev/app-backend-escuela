import { AddAlumnoToSeccionDTO } from "../dto/seccion/add-alumno-to-seccion.dto";
import { AddHorarioDTO } from "../dto/seccion/add-horario-to-seccion.dto";
import { CreateSeccionDTO } from "../dto/seccion/create-seccion.dto";
import { GenerateHistorialDTO } from "../dto/seccion/generete-historial-dto";
import { PatchSeccionDTO } from "../dto/seccion/patch-seccion.dto";
import { UpdateSeccionDTO } from "../dto/seccion/update-seccion.dto";
import { SeccionEntity } from "../entities/compuestas/seccion.entity";
import { Repository } from "./repository";

export interface SeccionRepository 
extends Repository<SeccionEntity, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO>
{
    addAlumno(dto: AddAlumnoToSeccionDTO): Promise<SeccionEntity>;

    addHorario(dto: AddHorarioDTO): Promise<SeccionEntity>;
    
    generateHistorial(dto: GenerateHistorialDTO): Promise<void>;
}