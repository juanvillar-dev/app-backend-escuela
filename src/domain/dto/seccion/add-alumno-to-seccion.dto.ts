import { CustomError } from "../../entities/basicas/custom.error";

export class AddAlumnoToSeccionDTO {
    public constructor(
        public readonly seccionId: number,
        public readonly alumnoId: number,
    ) {}


    static create(obj: { [key: string]: any }): AddAlumnoToSeccionDTO {
        const { seccionId, alumnoId } = obj;

        if (!seccionId || isNaN(Number(seccionId)))
            throw CustomError.badRequest("AddAlumnoToSeccionDTO: SeccionId inválido");

        if (!alumnoId || isNaN(Number(alumnoId)))
            throw CustomError.badRequest("AddAlumnoToSeccionDTO: AlumnoId inválido");


        return new AddAlumnoToSeccionDTO(
            Number(seccionId), 
            Number(alumnoId)
        );
    }
}
