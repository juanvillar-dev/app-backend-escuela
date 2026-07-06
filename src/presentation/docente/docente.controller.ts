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
}