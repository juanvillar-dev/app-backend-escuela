import { CustomError } from "../basicas/custom.error";
import { MateriaEntity } from "../basicas/materia.entitty";
import { DocenteEntity } from "../compuestas/docente.entity";
import { SeccionEntity } from "../compuestas/seccion.entity";

export class HorarioEntity {
    constructor(
        public readonly id: number,
        public seccion: SeccionEntity,
        public materia: MateriaEntity,
        public docente: DocenteEntity,
        public diaSemana: string,
        public horaInicio: Date,
        public horaFin: Date,
    ) {}

    static fromObject(obj: any): HorarioEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.seccion) 
        //     throw CustomError.badRequest("Sección requerida");
        // if (!obj.materia) 
        //     throw CustomError.badRequest("Materia requerida");
        // if (!obj.docente) 
        //     throw CustomError.badRequest("Docente requerido");
        // if (!obj.diaSemana) 
        //     throw CustomError.badRequest("Día de semana requerido");

        const seccion = SeccionEntity.fromObject(obj.seccion);
        const materia = MateriaEntity.fromObject(obj.materia);
        const docente = DocenteEntity.fromObject(obj.docente);

        const horaInicio= new Date(obj.horaInicio);
        const horaFin   = new Date(obj.horaFin);
        
        if (isNaN(horaInicio.getTime()) || isNaN(horaFin.getTime())) {
            throw CustomError.unprocessable("Horas inválidas");
        }

        return new HorarioEntity(
            obj.id,
            seccion,
            materia,
            docente,
            obj.diaSemana,
            horaInicio,
            horaFin,
        );
    }
}
