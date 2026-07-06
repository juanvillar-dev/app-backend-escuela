import { CustomError } from "../../entities/basicas/custom.error";

export class UpdateSeccionDTO {
    private constructor(
        public readonly id      : number,
        public readonly nombre  : string,
        public readonly gradoId : number,
        public readonly tutorId : number,
        public readonly year    : number,
    ) {}


    static create(obj: { [key: string]: any }): UpdateSeccionDTO {
        const { id, nombre, gradoId, tutorId, year } = obj;

        if (!id || isNaN(Number(id)))
            throw CustomError.badRequest("UpdateSeccionDTO: ID inválido");

        if (!nombre || typeof nombre !== "string")
            throw CustomError.badRequest("UpdateSeccionDTO: Nombre inválido");

        if (!gradoId || isNaN(Number(gradoId)))
            throw CustomError.badRequest("UpdateSeccionDTO: GradoId inválido");

        if (!tutorId || isNaN(Number(tutorId)))
            throw CustomError.badRequest("UpdateSeccionDTO: TutorId inválido");

        if (!year || isNaN(Number(year)))
            throw CustomError.badRequest("UpdateSeccionDTO: Year inválido");


        return new UpdateSeccionDTO(
            Number(id), 
            nombre, 
            Number(gradoId), 
            Number(tutorId), 
            Number(year)
        );
    }
}
