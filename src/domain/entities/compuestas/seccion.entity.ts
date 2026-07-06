import { CustomError } from "../basicas/custom.error";
import { GradoEntity } from "../basicas/grado.entity";
import { DocenteEntity } from "./docente.entity";


export class SeccionEntity {
    constructor(
        public readonly id: number,
        public nombre: string,
        public grado: GradoEntity,
        public tutor: DocenteEntity,
        public year: number,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    
    static fromObject(obj: any): SeccionEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.nombre) 
        //     throw CustomError.badRequest("Nombre requerido");
        // if (!obj.grado) 
        //     throw CustomError.badRequest("Grado requerido");
        // if (!obj.tutor) 
        //     throw CustomError.badRequest("Tutor requerido");
        // if (!obj.year || isNaN(Number(obj.year))) {
        //     throw CustomError.badRequest("año inválido");
        // }

        const grado = GradoEntity.fromObject(obj.grado);
        const tutor = DocenteEntity.fromObject(obj.tutor);

        return new SeccionEntity(
            obj.id,
            obj.nombre,
            grado,
            tutor,
            Number(obj.year),
            new Date(obj.createdAt),
            new Date(obj.updatedAt),
        );
    }
}
