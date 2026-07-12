import { CustomError } from "../../entities/basicas/custom.error";

export class AddHorariosToSeccionDTO {
    private constructor(
        public readonly seccionId: number,
        public readonly horarios: {
            materiaId: number;
            docenteId: number;
            diaSemana: string;
            horaInicio: string; // 👈 ahora string "HH:mm"
            horaFin: string;    // 👈 ahora string "HH:mm"
        }[],
    ) {}

    static create(obj: { [key: string]: any }): AddHorariosToSeccionDTO {
        const { seccionId, horarios } = obj;

        if (!seccionId || isNaN(Number(seccionId)))
            throw CustomError.badRequest("AddHorariosToSeccionDTO: SeccionId inválido");

        if (!Array.isArray(horarios) || horarios.length === 0)
            throw CustomError.badRequest("AddHorariosToSeccionDTO: horarios debe ser un array no vacío");

        const parsedHorarios = horarios.map(h => {
            if (!h.materiaId || isNaN(Number(h.materiaId)))
                throw CustomError.badRequest("AddHorariosToSeccionDTO: materiaId inválido");
            if (!h.docenteId || isNaN(Number(h.docenteId)))
                throw CustomError.badRequest("AddHorariosToSeccionDTO: docenteId inválido");
            if (!h.diaSemana || typeof h.diaSemana !== "string")
                throw CustomError.badRequest("AddHorariosToSeccionDTO: diaSemana inválido");
            if (!h.horaInicio || !h.horaFin)
                throw CustomError.badRequest("AddHorariosToSeccionDTO: horaInicio/horaFin inválidos");

            return {
                materiaId: Number(h.materiaId),
                docenteId: Number(h.docenteId),
                diaSemana: h.diaSemana,
                horaInicio: h.horaInicio, // 👈 se mantiene como string
                horaFin: h.horaFin,
            };
        });

        return new AddHorariosToSeccionDTO(Number(seccionId), parsedHorarios);
    }
}
