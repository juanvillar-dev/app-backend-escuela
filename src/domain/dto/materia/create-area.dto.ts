import { CustomError } from "../../entities";


export class CreateAreaDTO {
    private constructor(
        public readonly nombre: string,
    ) {}


    static create(obj: { [key: string]: any }): CreateAreaDTO {
        const { nombre } = obj;

        if (!nombre || typeof nombre !== "string")
            throw CustomError.badRequest("Nombre inválido");

        
        return new CreateAreaDTO(nombre);
    }
}
