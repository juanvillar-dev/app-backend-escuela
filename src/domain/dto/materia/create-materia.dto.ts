import { CustomError } from "../../entities";


export class CreateMateriaDTO {
    private constructor(
        public readonly nombre: string,
        public readonly areaId: number,
    ) {}

    
    static create(obj: { [key: string]: any }): CreateMateriaDTO {
        const { nombre, areaId } = obj;

        if (!nombre || typeof nombre !== "string")
            throw CustomError.badRequest("Nombre inválido");
        
        if (!areaId || isNaN(Number(areaId)))
            throw CustomError.badRequest("AreaId inválido");


        return new CreateMateriaDTO(nombre, Number(areaId));
    }
}
