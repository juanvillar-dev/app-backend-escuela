import { CustomError } from "../../entities/basicas/custom.error";
import { CreateUsuarioDTO } from "../usuario/create-usuario.dto";


export class CreateAlumnoDTO {
    private constructor(
        public readonly fechaNacimiento : Date,
        public readonly gradoId         : number,
        public readonly usuario: CreateUsuarioDTO,
    ) {}


    static create(obj: { [key: string]: any }): CreateAlumnoDTO {
        const { fechaNacimiento, gradoId } = obj;

        if (!fechaNacimiento) 
            throw CustomError.badRequest("Fecha de nacimiento requerida");
        
        const fecha = new Date(fechaNacimiento);
        if (isNaN(fecha.getTime())) 
            throw CustomError.unprocessable("Fecha de nacimiento inválida");

        if (!gradoId || isNaN(Number(gradoId))) 
            throw CustomError.badRequest("GradoId inválido");


        return new CreateAlumnoDTO(
            fecha,
            Number(gradoId),
            CreateUsuarioDTO.create(obj.usuario)
        );
    }
}
