import { CustomError } from "../basicas/custom.error";
import { GradoEntity } from "../basicas/grado.entity";
import { MateriaEntity } from "../basicas/materia.entitty";
import { AlumnoEntity } from "../compuestas/alumno.entity";
import { NotaEntity } from "./nota.entity";


export class AlumnoMateriaGradoEntity {
    constructor(
        public readonly id: number,
        public alumno   : AlumnoEntity,
        public materia  : MateriaEntity,
        public grado    : GradoEntity,
        public year      : number,
        public notas    : NotaEntity[],
    ) {}


    static fromObject(obj: any): AlumnoMateriaGradoEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.alumno) 
        //     throw CustomError.badRequest("Alumno requerido");
        // if (!obj.materia) 
        //     throw CustomError.badRequest("Materia requerida");
        // if (!obj.grado) 
        //     throw CustomError.badRequest("Grado requerido");
        if (!obj.year || isNaN(Number(obj.year)))
            throw CustomError.badRequest("Año inválido");

        const alumno    = AlumnoEntity  .fromObject(obj.alumno);
        const materia   = MateriaEntity .fromObject(obj.materia);
        const grado     = GradoEntity   .fromObject(obj.grado);
        const notas = obj.notas?.map((n: any) => NotaEntity.fromObject(n)) || [];

        return new AlumnoMateriaGradoEntity(
            obj.id,
            alumno,
            materia,
            grado,
            Number(obj.year),
            notas,
        );
    }
}
