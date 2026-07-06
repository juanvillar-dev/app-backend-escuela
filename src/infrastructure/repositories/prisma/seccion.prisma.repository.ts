import { connect } from "node:http2";
import { prisma } from "../../../config/prisma";
import { AddAlumnoToSeccionDTO } from "../../../domain/dto/seccion/add-alumno-to-seccion.dto";
import { AddHorarioDTO } from "../../../domain/dto/seccion/add-horario-to-seccion.dto";
import { CreateSeccionDTO } from "../../../domain/dto/seccion/create-seccion.dto";
import { GenerateHistorialDTO } from "../../../domain/dto/seccion/generete-historial-dto";
import { PatchSeccionDTO } from "../../../domain/dto/seccion/patch-seccion.dto";
import { UpdateSeccionDTO } from "../../../domain/dto/seccion/update-seccion.dto";
import { SeccionEntity } from "../../../domain/entities/compuestas/seccion.entity";
import { SeccionRepository } from "../../../domain/repositories/seccion.repository";
import { CustomError } from "../../../domain/entities";

export class SeccionPrismaRepository implements SeccionRepository{
    private prisma = prisma;

    private SeccionEntityAdapter(seccion: any): SeccionEntity {
        return SeccionEntity.fromObject({
            ...seccion,
            grado: seccion.grado,
            tutor: seccion.tutor,
            alumnos: seccion.alumnos,
            horarios: seccion.horarios,
        });
    }
    private SeccionSimpleEntityAdapter(seccion: any): SeccionEntity {
        return SeccionEntity.fromObject({
            ...seccion,
            grado: seccion.grado,
            tutor: seccion.tutor,
            alumnos: [],
            horarios: [],
        });
    }


    async findById(id: number): Promise<SeccionEntity | null> {
        const seccion = await this.prisma.seccion.findUnique({
            where: {id},
            include: {
                grado: {include: {materias: { include: {materia: { include: {area: true} }}}}},
                tutor: {include: {usuario: true}},
                alumnos: {include: {alumno: {include: {usuario: true}}}},
                horarios: { include: { materia: true, docente: { include: { usuario: true } } } }            }
        });
        return seccion
            ? this.SeccionEntityAdapter(seccion) 
            : null;
    }


    
    async findAll(): Promise<SeccionEntity[]> {
        const secciones = await this.prisma.seccion.findMany({
            include: {
                grado: true,
                tutor: {include:{usuario: true}}
            }
        })
        return secciones.map(s => this.SeccionSimpleEntityAdapter(s));
    }


    
    async create(dto: CreateSeccionDTO): Promise<SeccionEntity> {
        try {
            const seccion = await this.prisma.seccion.create({
                data: {
                    nombre: dto.nombre,
                    grado: {connect: {id: dto.gradoId}},
                    tutor: {connect: {id: dto.tutorId}},
                    year: dto.year
                },
                include: {
                    grado: true,
                    tutor: {include: {usuario: true}},
                    alumnos: true,
                    horarios: true
                }
            });
            return this.SeccionSimpleEntityAdapter(seccion);
        } catch (err: any) {
            throw CustomError.internalServer("Error al crear la sección: " + err.message);
        }
    }


    
    async update(dto: UpdateSeccionDTO): Promise<SeccionEntity> {
        try {
            const seccion = await this.prisma.seccion.update({
                where: { id: dto.id },
                data: {
                    nombre: dto.nombre,
                    grado: { connect: { id: dto.gradoId } },
                    tutor: { connect: { id: dto.tutorId } },
                    year: dto.year,
                },
                include: {
                    grado: true,
                    tutor: { include: { usuario: true } },
                    alumnos: true,
                    horarios: true
                }
            });
            return this.SeccionEntityAdapter(seccion);
            
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Sección no encontrada");
            throw CustomError.internalServer("Error al actualizar la sección: " + err.message);
        }
    }


    
    async patch(dto: PatchSeccionDTO): Promise<SeccionEntity> {
        try {
            const data = Object.fromEntries(
                Object.entries(dto).filter(([key, value]) => key !== "id" && value !== undefined)
            );

            const seccion = await this.prisma.seccion.update({
                where: { id: dto.id },
                data,
                include: {
                    grado: true,
                    tutor: { include: { usuario: true } },
                    alumnos: true,
                    horarios: true
                }
            });
            return this.SeccionEntityAdapter(seccion);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Sección no encontrada");
            throw CustomError.internalServer("Error al actualizar parcialmente la sección: " + err.message);
        }
    }


    
    async deleteById(id: number): Promise<SeccionEntity | null> {
        try {
            const seccion = await this.prisma.seccion.delete({
                where: { id },
                include: {
                    grado: true,
                    tutor: { include: { usuario: true } },
                    alumnos: true,
                    horarios: true
                }
            });
            return this.SeccionEntityAdapter(seccion);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Sección no encontrada");
            throw CustomError.internalServer("Error al eliminar la sección: " + err.message);
        }
    }


    


    async addAlumno(dto: AddAlumnoToSeccionDTO): Promise<SeccionEntity> {
        await this.prisma.seccionAlumno.create({
            data: {
                seccionId: dto.seccionId,
                alumnoId: dto.alumnoId
            }
        });
        // Devuelve la sección actualizada
        return await this.findById(dto.seccionId) as SeccionEntity;
    }


    
    async addHorario(dto: AddHorarioDTO): Promise<SeccionEntity> {
        await this.prisma.horario.create({
            data: {
                seccionId: dto.seccionId,
                materiaId: dto.materiaId,
                docenteId: dto.docenteId,
                diaSemana: dto.diaSemana,
                horaInicio: dto.horaInicio,
                horaFin: dto.horaFin,
            }
        });
        return await this.findById(dto.seccionId) as SeccionEntity;
    }


    
    async generateHistorial(dto: GenerateHistorialDTO): Promise<void> {
        const seccion = await this.prisma.seccion.findUnique({
            where: { id: dto.seccionId },
            include: { grado: { include: { materias: true } } }
        });

        if (!seccion) throw CustomError.notFound("Sección no encontrada");

        const materias = seccion.grado.materias;
        for (const gm of materias) {
            await this.prisma.alumnoMateriaGrado.create({
                data: {
                    alumnoId: dto.alumnoId,
                    materiaId: gm.materiaId,
                    gradoId: seccion.gradoId,
                    year: seccion.year
                }
            });
        }
    }
}