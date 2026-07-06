import { UpdateUsuarioDTO } from "../usuario/update-usuario.dto";

export class UpdateDocenteDTO {
    private constructor (
        public readonly id : number,
        public readonly especialidad: string | null,
        public readonly usuario: UpdateUsuarioDTO
    ){}


    static create(obj: {[key: string]: any}): UpdateDocenteDTO {
        const {id, especialidad, usuario} = obj

        return new UpdateDocenteDTO(
            Number(id),
            especialidad ?? null,
            UpdateUsuarioDTO.create({...usuario, id: "0"})
        );
    }
}