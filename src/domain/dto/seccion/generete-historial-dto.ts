import { CustomError } from "../../entities/basicas/custom.error";

export class GenerateHistorialDTO {
    public constructor(
        public readonly seccionId: number,
        public readonly alumnoId: number,
    ) {}


    static create(obj: { [key: string]: any }): GenerateHistorialDTO {
        const { seccionId, alumnoId } = obj;

        if (!seccionId || isNaN(Number(seccionId)))
            throw CustomError.badRequest("GenerateHistorialDTO: SeccionId inválido");

        if (!alumnoId || isNaN(Number(alumnoId)))
            throw CustomError.badRequest("GenerateHistorialDTO: AlumnoId inválido");


        return new GenerateHistorialDTO(
            Number(seccionId), 
            Number(alumnoId)
        );
    }
}
