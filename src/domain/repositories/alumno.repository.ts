import { CreateAlumnoDTO } from "../dto/alumno/create-alumno.dto";
import { PatchAlumnoDTO } from "../dto/alumno/patch-alumno.dto";
import { UpdateAlumnoDTO } from "../dto/alumno/update-alumno.dto";
import { AlumnoEntity } from "../entities/compuestas/alumno.entity";
import { Repository } from "./repository";

export interface AlumnoRepository 
extends Repository<AlumnoEntity, CreateAlumnoDTO, UpdateAlumnoDTO, PatchAlumnoDTO> 
{}