import { prisma } from "../../../config/prisma";
import { SeccionEntity } from "../../../domain/entities/compuestas/seccion.entity";
import { CreateSeccionDTO } from "../../../domain/dto/seccion/create-seccion.dto";
import { UpdateSeccionDTO } from "../../../domain/dto/seccion/update-seccion.dto";
import { PatchSeccionDTO } from "../../../domain/dto/seccion/patch-seccion.dto";
import { SeccionRepository } from "../../../domain/repositories/seccion.repository";
import { CustomError } from "../../../domain/entities";
import { AddAlumnoToSeccionDTO } from "../../../domain/dto/seccion/add-alumno-to-seccion.dto";
import { GenerateHistorialDTO } from "../../../domain/dto/seccion/generete-historial-dto";
import { AddAlumnosToSeccionDTO } from "../../../domain/dto/seccion/add-alumnos-to-seccion.dto";
import { AddHorariosToSeccionDTO } from "../../../domain/dto/seccion/add-horarios-to-seccion.dto";
import { SeccionDetalleDTO } from "../../../domain/dto/seccion/details-secction.dto";

export class SeccionPrismaRepository implements SeccionRepository {
    
    private prisma = prisma;

    private SeccionEntityAdapter(seccion: any): SeccionEntity {
        return SeccionEntity.fromObject({
            ...seccion,
            grado: seccion.grado,
            tutor: seccion.tutor,
        });
    }



    
    async findByIdDetalle(id: number): Promise<SeccionDetalleDTO | null> {
        const seccion = await this.prisma.seccion.findUnique({
            where: { id },
            include: {
                grado: {
                    include: {
                        materias: { include: { materia: {include: {area: true}} } }
                    }
                },
                tutor: { include: { usuario: true } },
                alumnos: {
                    include: {
                        alumno: { include: { usuario: true, grado: true } }
                    }
                },
                horarios: {
                    include: {
                        materia: { include: {area: true}},
                        docente: { include: { usuario: true } }
                    }
                },
                _count: { select: { alumnos: true } }
            }
        });

        return seccion ? SeccionDetalleDTO.fromPrisma(seccion) : null;
    }




    async findById(id: number): Promise<SeccionEntity | null> {
        const seccion = await this.prisma.seccion.findUnique({
            where: { id },
            include: {
                grado: true,
                tutor: { include: { usuario: true } },
                _count: { select: { alumnos: true } }, // 👈 cuenta registros en SeccionAlumno
            },
        });

        return seccion
            ? SeccionEntity.fromObject({
                ...seccion,
                numeroAlumnos: seccion._count.alumnos,
            })
            : null;
    }




    async findAll(): Promise<SeccionEntity[]> {
        const secciones = await this.prisma.seccion.findMany({
            include: {
                grado: true,
                tutor: { include: { usuario: true } },
                _count: { select: { alumnos: true } }, // 👈 cuenta registros en SeccionAlumno
            },
        });

        return secciones.map(s =>
            SeccionEntity.fromObject({
                ...s,
                numeroAlumnos: s._count.alumnos,
            })
        );
    }





    async create(dto: CreateSeccionDTO): Promise<SeccionEntity> {
        const seccion = await this.prisma.seccion.create({
            data: {
                nombre: dto.nombre,
                grado: { connect: { id: dto.gradoId } },
                tutor: { connect: { id: dto.tutorId } },
                year: dto.year,
                // activo y createdAt se generan automáticamente
            },
            include: {
                grado: true,
                tutor: { include: { usuario: true } },
            },
        });
        return this.SeccionEntityAdapter(seccion);
    }




    async update(dto: UpdateSeccionDTO): Promise<SeccionEntity> {
        const seccion = await this.prisma.seccion.update({
            where: { id: dto.id },
            data: {
                nombre: dto.nombre,
                grado: { connect: { id: dto.gradoId } },
                tutor: { connect: { id: dto.tutorId } },
                year: dto.year,
                ...(dto.activo !== undefined && { activo: dto.activo }),
            },
            include: {
                grado: true,
                tutor: { include: { usuario: true } },
            },
        });
        return this.SeccionEntityAdapter(seccion);
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
                },
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
                },
            });
            return this.SeccionEntityAdapter(seccion);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Sección no encontrada");
            throw CustomError.internalServer("Error al eliminar la sección: " + err.message);
        }
    }













    
    async addAlumno(dto: AddAlumnoToSeccionDTO): Promise<void> {
        await this.prisma.seccionAlumno.create({
            data: {
                seccionId: dto.seccionId,
                alumnoId: dto.alumnoId,
            },
        });
    }




    async addAlumnos(dto: AddAlumnosToSeccionDTO): Promise<void> {
        await this.prisma.seccionAlumno.createMany({
            data: dto.alumnosIds.map(id => ({
                seccionId: dto.seccionId,
                alumnoId: id,
            })),
            skipDuplicates: true, // evita error si ya estaba asignado
        });
    }




    async generateHistorial(dto: GenerateHistorialDTO): Promise<void> {
        const seccion = await this.prisma.seccion.findUnique({
            where: { id: dto.seccionId },
            include: { grado: { include: { materias: true } } },
        });

        if (!seccion) throw CustomError.notFound("Sección no encontrada");

        for (const gm of seccion.grado.materias) {
            await this.prisma.alumnoMateriaGrado.create({
                data: {
                    alumnoId: dto.alumnoId,
                    materiaId: gm.materiaId,
                    gradoId: seccion.gradoId,
                    year: seccion.year,
                },
            });
        }
    }






    


      
    async addHorarios(dto: AddHorariosToSeccionDTO): Promise<void> {
        // Paso 1: eliminar todos los horarios asociados a la sección
        await this.prisma.horario.deleteMany({
            where: { seccionId: dto.seccionId }
        });

        // Paso 2: insertar los nuevos horarios
        await this.prisma.horario.createMany({
            data: dto.horarios.map(h => ({
                seccionId: dto.seccionId,
                materiaId: h.materiaId,
                docenteId: h.docenteId,
                diaSemana: h.diaSemana,
                horaInicio: h.horaInicio, // 👈 string "HH:mm"
                horaFin: h.horaFin,
            })),
            skipDuplicates: true,
        });
    }

}
