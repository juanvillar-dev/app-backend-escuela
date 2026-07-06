import { CustomError } from "../../entities/basicas/custom.error";

export class AddHorarioDTO {
    public constructor(
        public readonly seccionId: number,
        public readonly materiaId: number,
        public readonly docenteId: number,
        public readonly diaSemana: string,
        public readonly horaInicio: Date,
        public readonly horaFin: Date,
    ) {}


    static create(obj: { [key: string]: any }): AddHorarioDTO {
        const { seccionId, materiaId, docenteId, diaSemana, horaInicio, horaFin } = obj;

        if (!seccionId || isNaN(Number(seccionId)))
            throw CustomError.badRequest("AddHorarioDTO: SeccionId inválido");

        if (!materiaId || isNaN(Number(materiaId)))
            throw CustomError.badRequest("AddHorarioDTO: MateriaId inválido");

        if (!docenteId || isNaN(Number(docenteId)))
            throw CustomError.badRequest("AddHorarioDTO: DocenteId inválido");

        if (!diaSemana || typeof diaSemana !== "string")
            throw CustomError.badRequest("AddHorarioDTO: DiaSemana inválido");

        const inicio = new Date(horaInicio);
        const fin = new Date(horaFin);
        if (isNaN(inicio.getTime()) || isNaN(fin.getTime()))
            throw CustomError.badRequest("AddHorarioDTO: Horas inválidas");


        return new AddHorarioDTO(
            Number(seccionId),
            Number(materiaId),
            Number(docenteId),
            diaSemana,
            inicio,
            fin
        );
    }
}
