import { CustomError } from "../../entities";


export class PatchMateriaDTO {
    private constructor(
        public readonly id: number,
        public readonly nombre?: string,
        public readonly areaId?: number,
    ) {}

    static create(obj: { [key: string]: any }): PatchMateriaDTO {
        const { id, nombre, areaId } = obj;

        if (!id || isNaN(Number(id)))
            throw CustomError.badRequest("PatchMateriaDTO: ID inválido");

        if (nombre && typeof nombre !== "string")
            throw CustomError.badRequest("PatchMateriaDTO: Nombre inválido");

        if (areaId && isNaN(Number(areaId)))
            throw CustomError.badRequest("PatchMateriaDTO: AreaId inválido");

        return new PatchMateriaDTO(
            Number(id),
            nombre,
            areaId ? Number(areaId) : undefined
        );
    }
}
