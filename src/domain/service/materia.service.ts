import { CreateMateriaDTO } from "../dto/materia/create-materia.dto";
import { PatchMateriaDTO } from "../dto/materia/patch-materia.dto";
import { UpdateMateriaDTO } from "../dto/materia/update-materia.dto";
import { AreaEntity, CustomError, MateriaEntity } from "../entities";
import { MateriaRepository } from "../repositories/materia.repository";
import { ServiceBase } from "./base.service";

export class MateriaService 
extends ServiceBase<MateriaEntity, CreateMateriaDTO, UpdateMateriaDTO, PatchMateriaDTO, MateriaRepository>
{
    constructor (repo : MateriaRepository ) {
        super(repo);
    }

    

    async findAreas(): Promise<AreaEntity[]>{
        return await this.repo.findAreas();
    }


    async findMateriasByAreaId(id: number){
        return await this.repo.findAllByAreaId(id);
    }


}