import { CreateAlumnoDTO } from "../../domain/dto/alumno/create-alumno.dto";
import { PatchAlumnoDTO } from "../../domain/dto/alumno/patch-alumno.dto";
import { UpdateAlumnoDTO } from "../../domain/dto/alumno/update-alumno.dto";
import { AlumnoEntity } from "../../domain/entities/compuestas/alumno.entity";
import { AlumnoService } from "../../domain/service/alumno.service";
import { Controller } from "../base.controller";

export class AlumnoController 
extends Controller<AlumnoEntity, CreateAlumnoDTO, UpdateAlumnoDTO, PatchAlumnoDTO>
{
    constructor(service: AlumnoService){
        super(service, CreateAlumnoDTO, UpdateAlumnoDTO, PatchAlumnoDTO);
    }
}