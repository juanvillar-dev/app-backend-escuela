import { CustomError } from "../../entities";


export class UpdateMateriaDTO {
    private constructor(
        public readonly id: number,
        public readonly nombre: string,
        public readonly areaId: number,
    ) {}


    static create(obj: { [key: string]: any }): UpdateMateriaDTO {
        const { id, nombre, areaId } = obj;
        
        if (!id || isNaN(Number(id)))
            throw CustomError.badRequest("ID inválido");

        if (!nombre || typeof nombre !== "string")
            throw CustomError.badRequest("Nombre inválido");
        
        if (!areaId || isNaN(Number(areaId)))
            throw CustomError.badRequest("AreaId inválido");


        return new UpdateMateriaDTO(
            Number(id), 
            nombre, 
            Number(areaId)
        );
    }
}