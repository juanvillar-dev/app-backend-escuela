import { CustomError } from "./custom.error";


export class AreaEntity {
    constructor(
        public readonly id: number,
        public nombre: string,
    ) {}


    static fromObject(obj: {[key: string]: any}): AreaEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.nombre) 
        //     throw CustomError.badRequest("Nombre requerido");
        
        return new AreaEntity(
            obj.id,
            obj.nombre
        );
    }
}
