import { CreateDocenteDTO } from "../dto/docente/create-docente.dto";
import { PatchDocenteDTO } from "../dto/docente/patch-docente.dto";
import { UpdateDocenteDTO } from "../dto/docente/update-docente.dto";
import { DocenteEntity } from "../entities/compuestas/docente.entity";
import { Repository } from "./repository";

export interface DocenteRepository 
extends Repository<DocenteEntity, CreateDocenteDTO, UpdateDocenteDTO, PatchDocenteDTO>
{
    findHorariosByDocente(docenteId: number): Promise<any[]>;
}