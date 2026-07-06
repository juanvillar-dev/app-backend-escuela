import { CustomError } from "../basicas/custom.error";
import { GradoEntity } from "../basicas/grado.entity";
import { UsuarioEntity } from "../basicas/usuario.entity";


export class AlumnoEntity {
    constructor(
        public readonly id: number,
        public fechaNacimiento: Date,
        public usuario: UsuarioEntity,
        public grado: GradoEntity,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}


    static fromObject(obj: {[key: string]: any}): AlumnoEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.usuario) 
        //     throw CustomError.badRequest("Usuario requerido");
        // if (!obj.grado) 
        //     throw CustomError.badRequest("Grado requerido");

        const fechaNacimiento = new Date(obj.fechaNacimiento);
        
        if (isNaN(fechaNacimiento.getTime())) {
            throw CustomError.unprocessable("Fecha de nacimiento inválida");
        }

        const usuario   = UsuarioEntity .fromObject(obj.usuario);
        const grado     = GradoEntity   .fromObject(obj.grado);

        return new AlumnoEntity(
            obj.id,
            fechaNacimiento,
            usuario,
            grado,
            new Date(obj.createdAt),
            new Date(obj.updatedAt),
        );
    }
}
