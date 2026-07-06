import { CustomError } from "../basicas/custom.error";
import { GradoEntity } from "../basicas/grado.entity";
import { MateriaEntity } from "../basicas/materia.entitty";


export class GradoMateriaEntity {
    constructor(
        public readonly id: number,
        public grado: GradoEntity,
        public materia: MateriaEntity,
    ) {}

    
    static fromObject(obj: any): GradoMateriaEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.grado) 
        //     throw CustomError.badRequest("Grado requerido");
        // if (!obj.materia) 
        //     throw CustomError.badRequest("Materia requerida");

        const grado     = GradoEntity   .fromObject(obj.grado);
        const materia   = MateriaEntity .fromObject(obj.materia);

        return new GradoMateriaEntity(
            obj.id,
            grado,
            materia
        );
    }
}
