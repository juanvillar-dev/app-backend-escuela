import { CustomError } from "../../entities/basicas/custom.error";

export class PatchSeccionDTO {
    private constructor(
        public readonly id      : number,
        public readonly nombre? : string,
        public readonly gradoId?: number,
        public readonly tutorId?: number,
        public readonly year?   : number,
        public readonly activo? : boolean,
    ) {}

    static create(obj: { [key: string]: any }): PatchSeccionDTO {
        const { id, nombre, gradoId, tutorId, year, activo } = obj;

        if (!id || isNaN(Number(id)))
            throw CustomError.badRequest("PatchSeccionDTO: ID inválido");

        // Validaciones opcionales
        if (nombre !== undefined && typeof nombre !== "string")
            throw CustomError.badRequest("PatchSeccionDTO: Nombre inválido");

        if (gradoId !== undefined && isNaN(Number(gradoId)))
            throw CustomError.badRequest("PatchSeccionDTO: GradoId inválido");

        if (tutorId !== undefined && isNaN(Number(tutorId)))
            throw CustomError.badRequest("PatchSeccionDTO: TutorId inválido");

        if (year !== undefined && isNaN(Number(year)))
            throw CustomError.badRequest("PatchSeccionDTO: Year inválido");

        if (activo !== undefined && typeof activo !== "boolean")
            throw CustomError.badRequest("PatchSeccionDTO: Activo inválido");

        return new PatchSeccionDTO(
            Number(id),
            nombre,
            gradoId !== undefined ? Number(gradoId) : undefined,
            tutorId !== undefined ? Number(tutorId) : undefined,
            year !== undefined ? Number(year) : undefined,
            activo
        );
    }
}
