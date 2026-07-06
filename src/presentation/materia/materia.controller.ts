import { Request, Response } from "express";
import { CreateMateriaDTO } from "../../domain/dto/materia/create-materia.dto";
import { MateriaEntity } from "../../domain/entities";
import { MateriaService } from "../../domain/service/materia.service";
import { Controller } from "../base.controller";
import { UpdateMateriaDTO } from "../../domain/dto/materia/update-materia.dto";
import { PatchMateriaDTO } from "../../domain/dto/materia/patch-materia.dto";

export class MateriaController extends Controller
<MateriaEntity, CreateMateriaDTO, UpdateMateriaDTO, PatchMateriaDTO>
{
    constructor(service: MateriaService){
        super(service, CreateMateriaDTO, UpdateMateriaDTO, PatchMateriaDTO);
    }
    

    public getAreas = async (req: Request, res: Response) => {
        try {
            if(this.service instanceof MateriaService){
                console.log("buscando areas");
                const areas = await this.service.findAreas();
                console.log(areas);
                res.json(areas);
            }

        } catch (err: any) {this.handleError(err, res);}
    }
}