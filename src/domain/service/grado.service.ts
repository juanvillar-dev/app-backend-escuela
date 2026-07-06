import { CreateGradoDTO } from "../dto/grado/create-grado.dto";
import { PatchGradoDTO } from "../dto/grado/patch-grado.dto";
import { GradoEntity, MateriaEntity } from "../entities";
import { GradoRepository } from "../repositories/grado.repository";
import { ServiceBase } from "./base.service";

export class GradoService 
extends ServiceBase<GradoEntity, CreateGradoDTO, CreateGradoDTO, PatchGradoDTO, GradoRepository>
{
    constructor(repo: GradoRepository){
        super(repo);
    }


    getMateriasByGradoId(id: number): Promise<MateriaEntity[]> {
        return this.repo.getMateriasByGradoId(id);
    }
}    
