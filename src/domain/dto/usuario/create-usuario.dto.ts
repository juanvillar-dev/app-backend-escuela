import { CustomError } from "../../entities";


export class CreateUsuarioDTO {
    private constructor(
        public readonly dni     : string,
        public readonly nombre  : string,
        public readonly apellido: string,
        public readonly email   : string,
        public readonly passwordHash: string,
        public readonly rol     : "ADMIN" | "DOCENTE" | "ALUMNO",
        public readonly genero  : "M" | "F",
    ){}


    static create(obj: {[key: string]: any }): CreateUsuarioDTO{
        const { dni, nombre, apellido, email, passwordHash, rol, genero } = obj;


        if (!dni || typeof dni !== "string") 
            throw CustomError.badRequest("CreateUsuarioDTO: DNI inválido");

        if (!nombre || typeof nombre !== "string") 
            throw CustomError.badRequest("CreateUsuarioDTO: Nombre inválido");
        
        if (!apellido || typeof apellido !== "string") 
            throw CustomError.badRequest("CreateUsuarioDTO: Apellido inválido");
        
        if (!email || typeof email !== "string") 
            throw CustomError.badRequest("CreateUsuarioDTO: Email inválido");
        
        if (!passwordHash || typeof passwordHash !== "string") 
            throw CustomError.badRequest("CreateUsuarioDTO: PasswordHash inválido");
        
        if (!["ADMIN","DOCENTE","ALUMNO"].includes(rol)) 
            throw CustomError.unprocessable("CreateUsuarioDTO: Rol inválido");
        
        if (!["M","F"].includes(genero)) 
            throw CustomError.unprocessable("CreateUsuarioDTO: Género inválido");


        return new CreateUsuarioDTO(
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