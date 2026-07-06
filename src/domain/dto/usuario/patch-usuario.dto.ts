import { CustomError } from "../../entities";


export class PatchUsuarioDTO {
    private constructor(
        public readonly id: number,
        public readonly dni?: string,
        public readonly nombre?: string,
        public readonly apellido?: string,
        public readonly email?: string,
        public readonly passwordHash?: string,
        public readonly rol?: "ADMIN" | "DOCENTE" | "ALUMNO",
        public readonly genero?: "M" | "F",
    ) {}

    static create(obj: { [key: string]: any }): PatchUsuarioDTO {
        const { id, dni, nombre, apellido, email, passwordHash, rol, genero } = obj;
        
        if (!id || isNaN(Number(id))) 
            throw CustomError.badRequest("PatchUsuarioDTO: ID inválido");

        // No exigimos los demás campos, porque son opcionales
        if (rol && !["ADMIN","DOCENTE","ALUMNO"].includes(rol)) 
            throw CustomError.unprocessable("PatchUsuarioDTO: Rol inválido");
        
        if (genero && !["M","F"].includes(genero)) 
            throw CustomError.unprocessable("PatchUsuarioDTO: Género inválido");

        return new PatchUsuarioDTO(
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
