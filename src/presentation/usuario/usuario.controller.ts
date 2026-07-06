import { Request, Response } from "express";
import { UsuarioService } from "../../domain/service/usuario.service";
import { CreateUsuarioDTO } from "../../domain/dto/usuario/create-usuario.dto";
import { Controller } from "../base.controller";
import { UsuarioEntity } from "../../domain/entities";
import { UpdateUsuarioDTO } from "../../domain/dto/usuario/update-usuario.dto";
import { PatchUsuarioDTO } from "../../domain/dto/usuario/patch-usuario.dto";

export class UsuarioController 
extends Controller<UsuarioEntity, CreateUsuarioDTO, UpdateUsuarioDTO, PatchUsuarioDTO>
{
    constructor(service: UsuarioService){
        super(service, CreateUsuarioDTO, UpdateUsuarioDTO, PatchUsuarioDTO);
    }


}