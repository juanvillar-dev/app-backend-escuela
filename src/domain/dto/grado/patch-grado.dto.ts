import { CustomError } from "../../entities";


export class PatchGradoDTO {
    private constructor(
        public readonly id: number,
        public readonly nivel?: "inicial" | "primaria" | "secundaria",
        public readonly year?: number,
        public readonly materiasIds?: number[]
    ) {}
    

    static create(obj: { [key: string]: any }): PatchGradoDTO {
        const { id, nivel, year, materiasIds } = obj;

        if (!id || isNaN(Number(id)))
            throw CustomError.badRequest("PatchGradoDTO: ID inválido");

        if (nivel && !["inicial","primaria","secundaria"].includes(nivel))
            throw CustomError.unprocessable("PatchGradoDTO: Nivel inválido");

        if (year && isNaN(Number(year)))
            throw CustomError.badRequest("PatchGradoDTO: Year inválido");

        if (materiasIds && (!Array.isArray(materiasIds) || materiasIds.some(x => isNaN(Number(x))))) {
            throw CustomError.badRequest("PatchGradoDTO: MateriasIds debe ser un array de números");
        }

        return new PatchGradoDTO(
            Number(id),
            nivel,
            year ? Number(year) : undefined,
            materiasIds
        );
    }
}
