import { CreateUsuarioDTO } from "../dto/usuario/create-usuario.dto";
import { PatchUsuarioDTO } from "../dto/usuario/patch-usuario.dto";
import { UpdateUsuarioDTO } from "../dto/usuario/update-usuario.dto";
import { UsuarioEntity } from "../entities/basicas/usuario.entity";
import { UsuarioRepository } from "../repositories/usuario.repository";
import { ServiceBase } from "./base.service";

export class UsuarioService 
extends ServiceBase<UsuarioEntity, CreateUsuarioDTO, UpdateUsuarioDTO, PatchUsuarioDTO, UsuarioRepository>
{
    constructor (repo : UsuarioRepository ) {
        super(repo);
    }


}