import { CreateMateriaDTO } from "../dto/materia/create-materia.dto";
import { PatchMateriaDTO } from "../dto/materia/patch-materia.dto";
import { UpdateMateriaDTO } from "../dto/materia/update-materia.dto";
import { AreaEntity, MateriaEntity } from "../entities";
import { Repository } from "./repository";

export interface MateriaRepository
extends Repository<MateriaEntity, CreateMateriaDTO, UpdateMateriaDTO, PatchMateriaDTO>
{
    findAreas(): Promise<AreaEntity[]>;
    findAllByAreaId(id: number): Promise<MateriaEntity[]>
}
