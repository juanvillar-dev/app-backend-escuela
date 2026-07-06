import { CreateAlumnoDTO } from "../dto/alumno/create-alumno.dto";
import { PatchAlumnoDTO } from "../dto/alumno/patch-alumno.dto";
import { UpdateAlumnoDTO } from "../dto/alumno/update-alumno.dto";
import { AlumnoEntity } from "../entities/compuestas/alumno.entity";
import { AlumnoRepository } from "../repositories/alumno.repository";
import { ServiceBase } from "./base.service";

export class AlumnoService
extends ServiceBase<AlumnoEntity, CreateAlumnoDTO, UpdateAlumnoDTO, PatchAlumnoDTO, AlumnoRepository>
{
    constructor(repo: AlumnoRepository){
        super(repo);
    }
}