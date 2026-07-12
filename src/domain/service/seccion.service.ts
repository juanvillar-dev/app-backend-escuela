import { ServiceBase } from "./base.service";
import { SeccionRepository } from "../repositories/seccion.repository";
import { SeccionEntity } from "../entities/compuestas/seccion.entity";
import { CreateSeccionDTO } from "../dto/seccion/create-seccion.dto";
import { UpdateSeccionDTO } from "../dto/seccion/update-seccion.dto";
import { PatchSeccionDTO } from "../dto/seccion/patch-seccion.dto";
import { AddAlumnosToSeccionDTO } from "../dto/seccion/add-alumnos-to-seccion.dto";
import { GenerateHistorialDTO } from "../dto/seccion/generete-historial-dto";
import { AddAlumnoToSeccionDTO } from "../dto/seccion/add-alumno-to-seccion.dto";
import { AddHorarioDTO } from "../dto/seccion/add-horario-to-seccion.dto";
import { AddHorariosToSeccionDTO } from "../dto/seccion/add-horarios-to-seccion.dto";
import { SeccionDetalleDTO } from "../dto/seccion/details-secction.dto";

export class SeccionService 
extends ServiceBase<SeccionEntity, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO, SeccionRepository> {

    constructor(repo: SeccionRepository) {
        super(repo);
    }

    async findByIdDetalle(id: number): Promise<SeccionDetalleDTO | null> {
        return await this.repo.findByIdDetalle(id);
    }



    async addAlumnos(dto: AddAlumnosToSeccionDTO): Promise<SeccionEntity> {
        // 1. Insertar todos los alumnos en SeccionAlumno
        await this.repo.addAlumnos(dto);
        // 2. Generar historial académico para cada alumno
        for (const alumnoId of dto.alumnosIds) {
            await this.repo.generateHistorial(new GenerateHistorialDTO(dto.seccionId, alumnoId));
        }
        // 3. Devolver la sección actualizada
        return await this.repo.findById(dto.seccionId) as SeccionEntity;
    }




    async addHorarios(dto: AddHorariosToSeccionDTO): Promise<SeccionEntity> {
        await this.repo.addHorarios(dto);
        return await this.repo.findById(dto.seccionId) as SeccionEntity;
    }



    async addAlumno(dto: AddAlumnoToSeccionDTO): Promise<SeccionEntity> {
        // 1. Insertar el alumno en la sección
        const seccion = await this.repo.addAlumno(dto);

        // 2. Generar historial académico para ese alumno
        await this.repo.generateHistorial(new GenerateHistorialDTO(dto.seccionId, dto.alumnoId));

        // 3. Devolver la sección actualizada
        return await this.repo.findById(dto.seccionId) as SeccionEntity;
    }




    async addHorario(dto: AddHorarioDTO): Promise<SeccionEntity> {
        await this.repo.addHorario(dto);
        return await this.repo.findById(dto.seccionId) as SeccionEntity;
    }


}
