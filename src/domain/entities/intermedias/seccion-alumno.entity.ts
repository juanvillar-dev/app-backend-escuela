import { CustomError } from "../basicas/custom.error";
import { AlumnoEntity } from "../compuestas/alumno.entity";
import { SeccionEntity } from "../compuestas/seccion.entity";


export class SeccionAlumnoEntity {
    constructor(
        public readonly id: number,
        public seccion  : SeccionEntity,
        public alumno   : AlumnoEntity,
    ) {}


    static fromObject(obj: {[key: string]: any}): SeccionAlumnoEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.seccion) 
        //     throw CustomError.badRequest("Sección requerida");
        // if (!obj.alumno) 
        //     throw CustomError.badRequest("Alumno requerido");

        const seccion   = SeccionEntity .fromObject(obj.seccion);
        const alumno    = AlumnoEntity  .fromObject(obj.alumno);

        return new SeccionAlumnoEntity(
            obj.id,
            seccion,
            alumno,
        );
    }
}
