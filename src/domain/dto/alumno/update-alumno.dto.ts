import { CustomError } from "../../entities";
import { UpdateUsuarioDTO } from "../usuario/update-usuario.dto";

export class UpdateAlumnoDTO {
    private constructor(
        public readonly id: number,
        public readonly fechaNacimiento: Date,
        public readonly gradoId: number,
        public readonly usuario: UpdateUsuarioDTO,
    ) {}

    static create(obj: { [key: string]: any }): UpdateAlumnoDTO {
        const { id, fechaNacimiento, gradoId, usuario } = obj;

        if (!id || isNaN(Number(id))) throw CustomError.badRequest("UpdateAlumnoDTO: Id inválido");

        if (!fechaNacimiento) throw CustomError.badRequest("UpdateAlumnoDTO: Fecha requerida");
        const fecha = new Date(fechaNacimiento);
        if (isNaN(fecha.getTime())) throw CustomError.unprocessable("UpdateAlumnoDTO: Fecha inválida");

        if (!gradoId || isNaN(Number(gradoId))) throw CustomError.badRequest("UpdateAlumnoDTO: GradoId inválido");

        if (!usuario) throw CustomError.badRequest("UpdateAlumnoDTO: Usuario requerido");

        return new UpdateAlumnoDTO(
            Number(id),
            fecha,
            Number(gradoId),
            UpdateUsuarioDTO.create({...usuario, id: "0"})        // Aquí usamos UpdateUsuarioDTO pero ignoramos el id
        );
    }
}
