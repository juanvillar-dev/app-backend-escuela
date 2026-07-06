import { CustomError } from "../../entities";


export class UpdateUsuarioDTO {
    private constructor(
        public readonly id      : number,
        public readonly dni     : string,
        public readonly nombre  : string,
        public readonly apellido: string,
        public readonly email   : string,
        public readonly passwordHash: string,
        public readonly rol     : "ADMIN" | "DOCENTE" | "ALUMNO",
        public readonly genero  : "M" | "F",
    ){}


    static create(obj: {[key: string]: any}): UpdateUsuarioDTO{
        console.log(obj);
        const { id, dni, nombre, apellido, email, passwordHash, rol, genero } = obj;

        if (!id || isNaN(Number(id))) 
            throw CustomError.badRequest("UpdateUsuarioDTO: ID inválido");

        if (!dni || typeof dni !== "string") 
            throw CustomError.badRequest("UpdateUsuarioDTO: DNI inválido");

        if (!nombre || typeof nombre !== "string") 
            throw CustomError.badRequest("UpdateUsuarioDTO: Nombre inválido");
        
        if (!apellido || typeof apellido !== "string") 
            throw CustomError.badRequest("UpdateUsuarioDTO: Apellido inválido");
        
        if (!email || typeof email !== "string") 
            throw CustomError.badRequest("UpdateUsuarioDTO: Email inválido");
        
        if (!passwordHash || typeof passwordHash !== "string") 
            throw CustomError.badRequest("UpdateUsuarioDTO: PasswordHash inválido");
        
        if (!["ADMIN","DOCENTE","ALUMNO"].includes(rol)) 
            throw CustomError.unprocessable("UpdateUsuarioDTO: Rol inválido");
        
        if (!["M","F"].includes(genero)) 
            throw CustomError.unprocessable("UpdateUsuarioDTO: Género inválido");

        return new UpdateUsuarioDTO(
            Number(id),
            dni,
            nombre, 
            apellido, 
            email, 
            passwordHash, 
            rol, 
            genero
        );
    }
}