import { CustomError } from "../../entities/basicas/custom.error";

export class CreateSeccionDTO {
    private constructor(
        public readonly nombre  : string,
        public readonly gradoId : number,
        public readonly tutorId : number,
        public readonly year    : number,
    ) {}

    
    static create(obj: { [key: string]: any }): CreateSeccionDTO {
        const { nombre, gradoId, tutorId, year } = obj;

        
        if (!nombre || typeof nombre !== "string") 
            throw CustomError.badRequest("CreateSeccionDTO: Nombre inválido");

        if (!gradoId || isNaN(Number(gradoId))) 
            throw CustomError.badRequest("CreateSeccionDTO: GradoId inválido");

        if (!tutorId || isNaN(Number(tutorId))) 
            throw CustomError.badRequest("CreateSeccionDTO: TutorId inválido");

        if (!year || isNaN(Number(year))) 
            throw CustomError.badRequest("CreateSeccionDTO: Year inválido");


        return new CreateSeccionDTO(
            nombre, 
            Number(gradoId), 
            Number(tutorId), 
            Number(year)
        );
    }
}
