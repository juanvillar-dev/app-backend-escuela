import { CustomError } from "../../entities/basicas/custom.error";

export class PatchSeccionDTO {
    private constructor(
        public readonly id      : number,
        public readonly nombre? : string,
        public readonly gradoId?: number,
        public readonly tutorId?: number,
        public readonly year?   : number,
    ) {}


    static create(obj: { [key: string]: any }): PatchSeccionDTO {
        const { id, nombre, gradoId, tutorId, year } = obj;

        if (!id || isNaN(Number(id)))
            throw CustomError.badRequest("PatchSeccionDTO: ID inválido");

        if (nombre && typeof nombre !== "string")
            throw CustomError.badRequest("PatchSeccionDTO: Nombre inválido");

        if (gradoId && isNaN(Number(gradoId)))
            throw CustomError.badRequest("PatchSeccionDTO: GradoId inválido");

        if (tutorId && isNaN(Number(tutorId)))
            throw CustomError.badRequest("PatchSeccionDTO: TutorId inválido");

        if (year && isNaN(Number(year)))
            throw CustomError.badRequest("PatchSeccionDTO: Year inválido");


        return new PatchSeccionDTO(
            Number(id),
            nombre,
            gradoId ? Number(gradoId) : undefined,
            tutorId ? Number(tutorId) : undefined,
            year ? Number(year) : undefined
        );
    }
}
