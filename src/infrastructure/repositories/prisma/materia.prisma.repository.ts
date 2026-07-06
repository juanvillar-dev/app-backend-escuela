import { run } from "node:test";
import { prisma } from "../../../config/prisma";
import { CreateMateriaDTO } from "../../../domain/dto/materia/create-materia.dto";
import { UpdateMateriaDTO } from "../../../domain/dto/materia/update-materia.dto";
import { AreaEntity, CustomError, MateriaEntity } from "../../../domain/entities";
import { MateriaRepository } from "../../../domain/repositories/materia.repository";
import { PatchMateriaDTO } from "../../../domain/dto/materia/patch-materia.dto";


export class MateriaPrismaRepository implements MateriaRepository {
    private prisma = prisma;



    async findAreas(): Promise<AreaEntity[]> {
        const areas = await this.prisma.area.findMany();
        return areas.map(AreaEntity.fromObject);
    }


    async findAllByAreaId(id: number): Promise<MateriaEntity[]> {
        const materias = await this.prisma.materia.findMany({
            where: { areaId: id },
            include: { area: true }
        });
        return materias.map(MateriaEntity.fromObject);
    }



    async findById(id: number): Promise<MateriaEntity | null> {
        const materia = await this.prisma.materia.findUnique({
            where: {id},
            include: { area: true }, // 👈 relación incluida
        });
        return materia
            ? MateriaEntity.fromObject(materia)
            : null;
    }
    


    async findAll(): Promise<MateriaEntity[]> {
        const materias = await this.prisma.materia.findMany({ include: { area: true } });
        return materias.map(MateriaEntity.fromObject);
    }



    async create(dto: CreateMateriaDTO): Promise<MateriaEntity> {
        try {
            const materia = await this.prisma.materia.create({
                data: {
                    nombre: dto.nombre,
                    areaId: dto.areaId,
                },
                include: { area: true},
            });

            return MateriaEntity.fromObject(materia);
        } catch (err: any) {
            if(err.code === "P2002"){
                throw CustomError.conflict("Ya existe una materia con ese nombre");
            }
            throw CustomError.internalServer("Error al crear la materia: "+err.message);
        }
    }




    async update(dto: UpdateMateriaDTO): Promise<MateriaEntity> {
        try {
            const materia = await this.prisma.materia.update({
                where: { id: dto.id },
                data: {
                    nombre: dto.nombre,
                    areaId: dto.areaId
                },
                include: { area: true },
            });
            return MateriaEntity.fromObject(materia);
        } catch (err: any) {
            if (err.code === "P2002"){
                throw CustomError.conflict("Ya existe una materia con ese nombre");
            }
            if (err.code === "P2025"){
                throw CustomError.notFound("Materia no encontrada");
            }
            throw CustomError.internalServer("Error al actualizar la materia" + err.message);
        }
    }




    async patch(dto: PatchMateriaDTO): Promise<MateriaEntity> {
        try {
            const data = Object.fromEntries(
                Object.entries(dto).filter(([key, value]) => key !== "id" && value !== undefined)
            );

            const materia = await this.prisma.materia.update({
                where: { id: dto.id },
                data,
                include: { area: true }
            });

            return MateriaEntity.fromObject(materia);
        } catch (err: any) {
            if (err.code === "P2002") {
                throw CustomError.conflict("Ya existe una materia con ese nombre");
            }
            if (err.code === "P2025") {
                throw CustomError.notFound("Materia no encontrada");
            }
            throw CustomError.internalServer("Error al actualizar parcialmente la materia: " + err.message);
        }
    }




    async deleteById(id: number): Promise<MateriaEntity | null> {
        try {
            const deleted = await this.prisma.materia.delete({ 
                where: { id },
                include: { area: true }, // 👈 relación incluida
            });
            return MateriaEntity.fromObject(deleted);
        } catch (err: any) {
            if (err.code === "P2025") {
                throw CustomError.notFound("Materia no encontrada");
            }
            throw CustomError.internalServer("Error al eliminar la materia" + err.message);
        }
    }
}