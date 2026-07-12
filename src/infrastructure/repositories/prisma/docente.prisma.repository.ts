import { prisma } from "../../../config/prisma";
import { CreateDocenteDTO } from "../../../domain/dto/docente/create-docente.dto";
import { PatchDocenteDTO } from "../../../domain/dto/docente/patch-docente.dto";
import { UpdateDocenteDTO } from "../../../domain/dto/docente/update-docente.dto";
import { CustomError } from "../../../domain/entities";
import { DocenteEntity } from "../../../domain/entities/compuestas/docente.entity";
import { DocenteRepository } from "../../../domain/repositories/docente.repository";

export class DocentePrismaRepository implements DocenteRepository{
    private prisma = prisma;



    private DocenteEntityAdapter(docente: any): DocenteEntity {
        return DocenteEntity.fromObject({
            ...docente,
            usuario: docente.usuario,
            especialidad: docente.especialidad
        })
    }


    
    async findById(id: number): Promise<DocenteEntity | null> {
        const docente = await this.prisma.docente.findUnique({
            where: {id},
            include: {usuario: true}
        })

        return docente 
            ? this.DocenteEntityAdapter(docente)
            : null;
    }



    
    async findAll(): Promise<DocenteEntity[]> {
        const docentes = await this.prisma.docente.findMany({
            include: {usuario: true}
        });
        return docentes.map(d => this.DocenteEntityAdapter(d));
    }



    
    async create(dto: CreateDocenteDTO): Promise<DocenteEntity> {
        try {
            const docente = await this.prisma.docente.create({
                data: {
                    especialidad: dto.especialidad,
                    usuario: {
                        create: {
                            dni: dto.usuario.dni,
                            nombre: dto.usuario.nombre,
                            apellido: dto.usuario.apellido,
                            email: dto.usuario.email,
                            passwordHash: dto.usuario.passwordHash,
                            rol: "DOCENTE",
                            genero: dto.usuario.genero
                        }
                    }
                },
                include: {usuario: true},
            });
            return this.DocenteEntityAdapter(docente);
        } catch (err: any) {
            if(err.code === "P2002")
                throw CustomError.conflict("Docente Repositorio: Email o dni ya existen ");
            throw CustomError.internalServer("Docente Repositorio: Error al crear docente: " + err.message);       
        }
    }



    
    async update(dto: UpdateDocenteDTO): Promise<DocenteEntity> {
        try {
            const docente = await this.prisma.docente.update({
                where: { id : dto.id},
                data: {
                    especialidad: dto.especialidad,
                    usuario: {
                        update: {
                            dni: dto.usuario.dni,
                            nombre: dto.usuario.nombre,
                            apellido: dto.usuario.apellido,
                            email: dto.usuario.email,
                            passwordHash: dto.usuario.passwordHash,
                            genero: dto.usuario.genero,
                        }
                    }
                },
                include: {usuario: true}
            })
            return this.DocenteEntityAdapter(docente);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Docente Repositorio: Docente no encontrado");
            throw CustomError.internalServer("Docente Repositorio: Error al actualizar docente")
        }
    }



    
    async patch(dto: PatchDocenteDTO): Promise<DocenteEntity> {
        try {
            const data = Object.fromEntries(
                Object.entries(dto).filter(([key, value]) => key !== "id" && value !== undefined)
            );

            if (dto.usuario) {
                Object.assign(data, {
                    usuario: {
                        update: Object.fromEntries(
                            Object.entries(dto.usuario).filter(([key, value]) => key !== "id" && value !== undefined)
                        )
                    }
                });
            }

            const docente = await this.prisma.docente.update({
                where: { id: dto.id },
                data,
                include: { usuario: true }
            });

            return this.DocenteEntityAdapter(docente);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Docente no encontrado");
            throw CustomError.internalServer("Error al actualizar parcialmente docente: " + err.message);
        }
    }



    
    async deleteById(id: number): Promise<DocenteEntity | null> {
        try {
            const docente = await this.prisma.docente.delete({
                where: {id},
                include: {usuario: true}
            })
            return this.DocenteEntityAdapter(docente);
        } catch (err: any){
            if (err.code === "P2025") throw CustomError.notFound("Docente Repositorio: Docente no encontrado");
            throw CustomError.internalServer("Docente Repositorio: Error al eliminar docente")
        }
    }


        
    
    async findHorariosByDocente(docenteId: number): Promise<any[]> {
        const horarios = await this.prisma.horario.findMany({
            where: { docenteId },
            include: {
                materia: true,
                seccion: { include: { grado: true } }, // 👈 trae grado
            },
        });

        return horarios.map(h => ({
            id: h.id,
            diaSemana: h.diaSemana,
            horaInicio: h.horaInicio,
            horaFin: h.horaFin,
            
            materia: { 
                id: h.materia.id, 
                nombre: h.materia.nombre 
            },
            
            seccion: {
                id: h.seccion.id,
                nombre: h.seccion.nombre,
                grado: {
                    id: h.seccion.grado.id,
                    nivel: h.seccion.grado.nivel,
                    year: h.seccion.grado.year,
                },
            },
        }));
    }

}