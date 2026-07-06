import { CustomError } from "../../entities";
import { PatchUsuarioDTO } from "../usuario/patch-usuario.dto";

export class PatchAlumnoDTO {
    private constructor(
        public readonly id: number,
        public readonly fechaNacimiento?: Date,
        public readonly gradoId?: number,
        public readonly usuario?: PatchUsuarioDTO,
    ) {}

    static create(obj: { [key: string]: any }): PatchAlumnoDTO {
        const { id, fechaNacimiento, gradoId, usuario } = obj;

        if (!id || isNaN(Number(id))) throw CustomError.badRequest("PatchAlumnoDTO: Id inválido");

        let fecha: Date | undefined;
        if (fechaNacimiento) {
            fecha = new Date(fechaNacimiento);
            if (isNaN(fecha.getTime())) throw CustomError.unprocessable("PatchAlumnoDTO: Fecha inválida");
        }

        return new PatchAlumnoDTO(
            Number(id),
            fecha,
            gradoId ? Number(gradoId) : undefined,
            usuario ? PatchUsuarioDTO.create({...usuario, id: "0"}) : undefined
        );
    }
}
