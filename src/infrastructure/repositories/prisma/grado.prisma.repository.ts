import { prisma } from "../../../config/prisma";
import { CreateGradoDTO } from "../../../domain/dto/grado/create-grado.dto";
import { PatchGradoDTO } from "../../../domain/dto/grado/patch-grado.dto";
import { UpdateGradoDTO } from "../../../domain/dto/grado/update-grado.dto";
import { MateriaEntity, GradoEntity, CustomError } from "../../../domain/entities";
import { GradoRepository } from "../../../domain/repositories/grado.repository";


export class GradoPrismaRepository implements GradoRepository {
    private prisma = prisma;



    async getMateriasByGradoId(id: number): Promise<MateriaEntity[]> {
        const grado = await this.prisma.grado.findUnique({
            where: { id },
            include: { materias: { include: { materia: true } }}
        });

        if (!grado) throw CustomError.notFound("Grado no encontrado");

        return grado.materias.map(gm => MateriaEntity.fromObject(gm.materia));    
    }

    

    async findById(id: number): Promise<GradoEntity | null> {
        const grado = await this.prisma.grado.findUnique({
            where: {id},
            include: {materias: { include: {materia: { include: {area: true} }}}}, // Incluir las materias relacionadas, y dentro su área
            //include: { materias: { include: {materia: true} }} // Incluir las materias relacionadas
        })
        console.log("grado prisma repo - findById");
        console.log(grado);
        return grado
            ? GradoEntity.fromObject(grado)
            : null;
    }



    async findAll(): Promise<GradoEntity[]> {
        const grados = await this.prisma.grado.findMany();
        return grados.map(GradoEntity.fromObject);
    }



    async create(dto: CreateGradoDTO): Promise<GradoEntity> {
        try {
            const grado = await this.prisma.grado.create({
                data: {
                    nivel: dto.nivel,
                    year: dto.year,
                    materias: dto.materiasIds 
                        ?   {
                                create : dto.materiasIds.map(id => ({
                                    materia: { connect: {id}}
                                }))
                            }
                        :   undefined
                },
                include: {materias: { include: {materia: { include: {area: true} }}}}, // Incluir las materias relacionadas, y dentro su área
            });

            return GradoEntity.fromObject(grado);  
             
        } catch (err: any) {
            if(err.code === "P2002"){
                throw CustomError.conflict("GradoRepository: Ya existe un grado con ese nivel y año");
            }
            throw CustomError.internalServer("GradoRepository: Error al crear el grado: "+err.message);
        }
    }



    async update(dto: UpdateGradoDTO): Promise<GradoEntity> {
        try {
            const grado = await this.prisma.grado.update({
                where: {id: dto.id},
                data: {
                    nivel: dto.nivel,
                    year: dto.year,
                    materias: dto.materiasIds 
                        ?   {   
                                deleteMany: {}, // Elimina todas las relaciones actuales
                                create: dto.materiasIds.map(id => ({
                                    materia: { connect: {id}}
                                }))
                            }
                        :   undefined
                },
                include: {materias: { include: {materia: { include: {area: true} }}}}, // Incluir las materias relacionadas, y dentro su área

            });

            return GradoEntity.fromObject(grado);
            
        } catch (err: any) {
            if (err.code === "P2025"){
                throw CustomError.notFound("GradoRepository: Grado no encontrado");
            }
            throw CustomError.internalServer("GradoRepository: Error al actualizar el grado: " + err.message);
        }
    }



    
    async patch(dto: PatchGradoDTO): Promise<GradoEntity> {
        try {
            const data = Object.fromEntries(
                Object.entries(dto).filter(([key, value]) => 
                    key !== "id" && 
                    key !== "materiasIds" && 
                    value !== undefined
                )
            );
            
            // Si se incluye materiasIds, hay que manejarlo distinto
            if (dto.materiasIds) {
                data.materias = {
                    deleteMany: {},
                    create: dto.materiasIds.map(id => ({ materia: { connect: { id } } }))
                }
            }

            const grado = await this.prisma.grado.update({
                where: { id: dto.id },
                data,
                include: { materias: { include: { materia: { include: { area: true } } } } }
            });

            return GradoEntity.fromObject(grado);
        } catch (err: any) {
            if (err.code === "P2025") {
                throw CustomError.notFound("Grado no encontrado");
            }
            throw CustomError.internalServer("GradoRepository: Error al actualizar parcialmente el grado: " + err.message);
        }
    }



    async deleteById(id: number): Promise<GradoEntity | null> {
        try {
            const deleted = await this.prisma.grado.delete({
                where: { id },
                include: { materias: { include: { materia: { include: { area: true } } } } }
            });
            return GradoEntity.fromObject(deleted);
        } catch (err: any) {
            if (err.code === "P2025") {
                throw CustomError.notFound("Grado no encontrado");
            }
            throw CustomError.internalServer("Error al eliminar el grado: " + err.message);
        }
    }
}