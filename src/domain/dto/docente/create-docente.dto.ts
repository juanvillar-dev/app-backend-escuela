import { CustomError } from "../../entities/basicas/custom.error";
import { CreateUsuarioDTO } from "../usuario/create-usuario.dto";


export class CreateDocenteDTO {
    private constructor (
        public readonly especialidad    :  string | null,
        public readonly usuario         : CreateUsuarioDTO,
    ){}


    static create(obj: {[key: string]: any}): CreateDocenteDTO{
        const {especialidad, usuario} = obj;

        if(!usuario)
            throw CustomError.badRequest("CreateDocenteDTO: Usuario requerido");

        return new CreateDocenteDTO(
            especialidad ?? null,
            CreateUsuarioDTO.create(usuario)
        );
    }
}