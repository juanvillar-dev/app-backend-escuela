import { CustomError } from "../../entities";


export class CreateGradoDTO {
    private constructor(
        public readonly nivel: "inicial" | "primaria" | "secundaria",
        public readonly year: number,
        public readonly materiasIds?: number[]
    ) {}

    
    static create(obj: { [key: string]: any }): CreateGradoDTO {
        const { nivel, year, materiasIds } = obj;

        if (!nivel || !["inicial","primaria","secundaria"].includes(nivel)) 
            throw CustomError.unprocessable("CreateGradoDTO: Nivel inválido");
        
        if (!year || isNaN(Number(year))) 
            throw CustomError.badRequest("CreateGradoDTO: Year inválido");
        
        if (materiasIds && !Array.isArray(materiasIds)) {
            throw CustomError.badRequest("CreateGradoDTO: MateriasIds debe ser un array de números");
        }
        
        return new CreateGradoDTO(nivel, Number(year), materiasIds);
    }
}
