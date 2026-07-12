import { CustomError } from "../../entities/basicas/custom.error";

export class AddAlumnosToSeccionDTO {
    private constructor(
        public readonly seccionId: number,
        public readonly alumnosIds: number[],
    ) {}

    static create(obj: { [key: string]: any }): AddAlumnosToSeccionDTO {
        const { seccionId, alumnosIds } = obj;

        if (!seccionId || isNaN(Number(seccionId)))
            throw CustomError.badRequest("AddAlumnosToSeccionDTO: SeccionId inválido");

        if (!Array.isArray(alumnosIds) || alumnosIds.length === 0)
            throw CustomError.badRequest("AddAlumnosToSeccionDTO: alumnosIds debe ser un array no vacío");

        const parsedIds = alumnosIds.map(id => {
            if (isNaN(Number(id))) throw CustomError.badRequest("AddAlumnosToSeccionDTO: alumnoId inválido");
            return Number(id);
        });

        return new AddAlumnosToSeccionDTO(Number(seccionId), parsedIds);
    }
}
