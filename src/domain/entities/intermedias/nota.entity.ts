import { CustomError } from "../basicas/custom.error";


export class NotaEntity {
    constructor(
        public readonly id: number,
        public valor: number,
        public tipoEvaluacion: string,
        public fecha: Date,
    ) {}

    
    static fromObject(obj: any): NotaEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (obj.valor === undefined || isNaN(Number(obj.valor))) {
        //     throw CustomError.badRequest("Valor de nota inválido");
        // }
        // if (!obj.tipoEvaluacion) 
        //     throw CustomError.badRequest("Tipo de evaluación requerido");

        const fecha = new Date(obj.fecha);// si es null, obtendrias un invalid date
        
        if (isNaN(fecha.getTime()))
            throw CustomError.unprocessable("Fecha inválida");


        return new NotaEntity(
            obj.id,
            Number(obj.valor),
            obj.tipoEvaluacion,
            fecha,
        );
    }
}
