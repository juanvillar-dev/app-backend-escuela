import { CustomError } from "../../entities";
import { PatchUsuarioDTO } from "../usuario/patch-usuario.dto";

export class PatchDocenteDTO{
    private constructor(
        public readonly id: number,
        public readonly especialidad?: string | null,
        public readonly usuario? : PatchUsuarioDTO
    ){}

    static create(obj: {[key: string]: any}): PatchDocenteDTO {
        const {id, especialidad, usuario} = obj;

        if(!id || isNaN(id))
            throw CustomError.badRequest("PatchDocenteDTO: id invalido");

        return new PatchDocenteDTO(
            Number(id),
            especialidad ?? undefined,
            usuario ? PatchUsuarioDTO.create({...usuario, id: "0"}) : undefined
        )
    }
}