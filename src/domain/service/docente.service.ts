import { CreateDocenteDTO } from "../dto/docente/create-docente.dto";
import { PatchDocenteDTO } from "../dto/docente/patch-docente.dto";
import { UpdateDocenteDTO } from "../dto/docente/update-docente.dto";
import { DocenteEntity } from "../entities/compuestas/docente.entity";
import { DocenteRepository } from "../repositories/docente.repository";
import { ServiceBase } from "./base.service";

export class DocenteService 
extends ServiceBase<DocenteEntity, CreateDocenteDTO, UpdateDocenteDTO, PatchDocenteDTO, DocenteRepository>
{
    constructor(repo: DocenteRepository){
        super(repo);
    }
}