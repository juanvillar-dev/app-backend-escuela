import { ServiceBase } from "./base.service";
import { SeccionRepository } from "../repositories/seccion.repository";

import { CreateSeccionDTO } from "../dto/seccion/create-seccion.dto";
import { UpdateSeccionDTO } from "../dto/seccion/update-seccion.dto";
import { PatchSeccionDTO } from "../dto/seccion/patch-seccion.dto";
import { SeccionEntity } from "../entities/compuestas/seccion.entity";
import { AddAlumnoToSeccionDTO } from "../dto/seccion/add-alumno-to-seccion.dto";
import { GenerateHistorialDTO } from "../dto/seccion/generete-historial-dto";
import { AddHorarioDTO } from "../dto/seccion/add-horario-to-seccion.dto";

export class SeccionService 
extends ServiceBase<SeccionEntity, CreateSeccionDTO, UpdateSeccionDTO, PatchSeccionDTO, SeccionRepository> {

    constructor(repo: SeccionRepository) {
        super(repo);
    }

    /**
     * Agregar alumno a la sección
     * - Inserta en SeccionAlumno
     * - Genera historial académico (AlumnoMateriaGrado)
     */
    async addAlumno(dto: AddAlumnoToSeccionDTO): Promise<SeccionEntity> {
        const seccion = await this.repo.addAlumno(dto);

        // Generar historial automáticamente
        await this.repo.generateHistorial(
            new GenerateHistorialDTO(dto.seccionId, dto.alumnoId)
        );

        return seccion;
    }

    /**
     * Agregar horario a la sección
     */
    async addHorario(dto: AddHorarioDTO): Promise<SeccionEntity> {
        return await this.repo.addHorario(dto);
    }

    /**
     * Generar historial académico manualmente (si se requiere)
     */
    async generateHistorial(dto: GenerateHistorialDTO): Promise<void> {
        await this.repo.generateHistorial(dto);
    }

    /**
     * Crear sección con efecto dominó opcional
     * - Si el DTO incluye alumnos y horarios, se agregan en cascada
     */
    async create(dto: CreateSeccionDTO & { alumnosIds?: number[], horarios?: AddHorarioDTO[] }): Promise<SeccionEntity> {
        const seccion = await this.repo.create(dto);

        // Si vienen alumnos en el DTO, agregarlos y generar historial
        if (dto.alumnosIds && dto.alumnosIds.length > 0) {
            for (const alumnoId of dto.alumnosIds) {
                await this.addAlumno(new AddAlumnoToSeccionDTO(seccion.id, alumnoId));
            }
        }

        // Si vienen horarios en el DTO, agregarlos
        if (dto.horarios && dto.horarios.length > 0) {
            for (const horario of dto.horarios) {
                await this.addHorario(
                    AddHorarioDTO.create({
                        seccionId: seccion.id,
                        materiaId: horario.materiaId,
                        docenteId: horario.docenteId,
                        diaSemana: horario.diaSemana,
                        horaInicio: horario.horaInicio,
                        horaFin: horario.horaFin,
                    })
                );
            }
        }

        return await this.repo.findById(seccion.id) as SeccionEntity;
    }
}
