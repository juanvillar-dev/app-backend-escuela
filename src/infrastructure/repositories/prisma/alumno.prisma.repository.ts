import { prisma } from "../../../config/prisma";
import { CreateAlumnoDTO } from "../../../domain/dto/alumno/create-alumno.dto";
import { UpdateAlumnoDTO } from "../../../domain/dto/alumno/update-alumno.dto";
import { PatchAlumnoDTO } from "../../../domain/dto/alumno/patch-alumno.dto";
import { CustomError } from "../../../domain/entities";
import { AlumnoEntity } from "../../../domain/entities/compuestas/alumno.entity";
import { AlumnoRepository } from "../../../domain/repositories/alumno.repository";

export class AlumnoPrismaRepository implements AlumnoRepository {
    private prisma = prisma;

    private AlumnoEntityAdapter(alumno: any): AlumnoEntity {
        return AlumnoEntity.fromObject({
            ...alumno,
            usuario: alumno.usuario,
            grado: {
                id: alumno.grado.id,
                nivel: alumno.grado.nivel,
                year: alumno.grado.year,
                materias: []
            }
        });
    }




    async findById(id: number): Promise<AlumnoEntity | null> {
        const alumno = await this.prisma.alumno.findUnique({
            where: { id },
            include: { usuario: true, grado: true },
        });
        return alumno ? this.AlumnoEntityAdapter(alumno) : null;
    }




    async findAll(): Promise<AlumnoEntity[]> {
        const alumnos = await this.prisma.alumno.findMany({
            include: { usuario: true, grado: true }
        });
        return alumnos.map(a => this.AlumnoEntityAdapter(a));
    }




    async create(dto: CreateAlumnoDTO): Promise<AlumnoEntity> {
        try {
            const alumno = await this.prisma.alumno.create({
                data: {
                    fechaNacimiento: dto.fechaNacimiento,
                    grado: { connect: { id: dto.gradoId } },
                    updatedAt: new Date(),
                    usuario: {
                        create: {
                            dni: dto.usuario.dni,
                            nombre: dto.usuario.nombre,
                            apellido: dto.usuario.apellido,
                            email: dto.usuario.email,
                            passwordHash: dto.usuario.passwordHash,
                            rol: "ALUMNO",
                            genero: dto.usuario.genero,
                        }
                    }
                },
                include: { usuario: true, grado: true }
            });
            return this.AlumnoEntityAdapter(alumno);
        } catch (err: any) {
            if (err.code === "P2002") throw CustomError.conflict("Email o DNI ya existen");
            throw CustomError.internalServer("Error al crear el alumno: " + err.message);
        }
    }




    async update(dto: UpdateAlumnoDTO): Promise<AlumnoEntity> {
        try {
            const alumno = await this.prisma.alumno.update({
                where: { id: dto.id },
                data: {
                    fechaNacimiento: dto.fechaNacimiento,
                    updatedAt: new Date(),
                    grado: { connect: { id: dto.gradoId } },
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
                include: { usuario: true, grado: true }
            });
            return this.AlumnoEntityAdapter(alumno);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Alumno no encontrado");
            throw CustomError.internalServer("Error al actualizar el alumno: " + err.message);
        }
    }




    async patch(dto: PatchAlumnoDTO): Promise<AlumnoEntity> {
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

            const alumno = await this.prisma.alumno.update({
                where: { id: dto.id },
                data,
                include: { usuario: true, grado: true }
            });

            return this.AlumnoEntityAdapter(alumno);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Alumno no encontrado");
            throw CustomError.internalServer("Error al actualizar parcialmente el alumno: " + err.message);
        }
    }



    
    async deleteById(id: number): Promise<AlumnoEntity | null> {
        try {
            const alumno = await this.prisma.alumno.delete({
                where: { id },
                include: { usuario: true, grado: true }
            });
            return this.AlumnoEntityAdapter(alumno);
        } catch (err: any) {
            if (err.code === "P2025") throw CustomError.notFound("Alumno no encontrado");
            throw CustomError.internalServer("Error al eliminar el alumno: " + err.message);
        }
    }
}
