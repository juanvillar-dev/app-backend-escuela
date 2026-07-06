import { AreaEntity } from "./area.entity";
import { CustomError } from "./custom.error";


export class MateriaEntity {
    constructor(
        public readonly id: number,
        public nombre: string,
        public area: AreaEntity,
    ) {}


    static fromObject(obj: {[key: string]: any}): MateriaEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.nombre) 
        //     throw CustomError.badRequest("Nombre requerido");
        // if (!obj.area) 
        //     throw CustomError.badRequest("Área requerida");
        
        const area = AreaEntity.fromObject(obj.area);

        return new MateriaEntity(
            obj.id,
            obj.nombre,
            area,
        );
    }
}
