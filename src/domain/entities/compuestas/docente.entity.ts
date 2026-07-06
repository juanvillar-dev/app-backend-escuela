import { CustomError } from "../basicas/custom.error";
import { UsuarioEntity } from "../basicas/usuario.entity";


export class DocenteEntity {
    constructor(
        public readonly id: number,
        public usuario      : UsuarioEntity,
        public especialidad : string | null,
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}


    static fromObject(obj: {[key: string]: any}): DocenteEntity {
        // if (!obj.id) 
        //     throw CustomError.badRequest("Id requerido");
        // if (!obj.usuario) 
        //     throw CustomError.badRequest("Usuario requerido");

        const usuario = UsuarioEntity.fromObject(obj.usuario);

        return new DocenteEntity(
            obj.id,
            usuario,
            obj.especialidad,
            new Date(obj.createdAt),
            new Date(obj.updatedAt),
        );
    }
}
