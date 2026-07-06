import { CustomError } from "./custom.error";


export class UsuarioEntity {
    constructor(
        public readonly id: number,
        public dni: string,
        public nombre: string,
        public apellido: string,
        public email: string,
        public passwordHash: string,
        public rol : "ADMIN" | "DOCENTE" | "ALUMNO",
        public genero: "M" | "F",
    ){}


    static fromObject(obj: {[key: string]: any}): UsuarioEntity{
        // if(!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if(!obj.dni) 
        //     throw CustomError.badRequest("DNI requerido");
        // if(!obj.nombre) 
        //     throw CustomError.badRequest("Nombre requerido");
        // if(!obj.apellido) 
        //     throw CustomError.badRequest("Apellido requerido");
        // if(!obj.email) 
        //     throw CustomError.badRequest("Email requerido");
        // if(!obj.passwordHash) 
        //     throw CustomError.badRequest("PasswordHash requerido");
        // //if(!["ADMIN","DOCENTE","ALUMNO"].includes(obj.rol))
        // //    throw CustomError.unprocessable("Rol inválido");
        // if(!["M","F"].includes(obj.genero))
        //     throw CustomError.unprocessable("Género invalido")

        return new UsuarioEntity(
            obj.id,
            obj.dni,
            obj.nombre,
            obj.apellido,
            obj.email,
            obj.passwordHash,
            obj.rol,
            obj.genero
        );
    }
}
