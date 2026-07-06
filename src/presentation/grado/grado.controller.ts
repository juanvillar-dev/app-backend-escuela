import { CreateGradoDTO } from "../../domain/dto/grado/create-grado.dto";
import { PatchGradoDTO } from "../../domain/dto/grado/patch-grado.dto";
import { UpdateGradoDTO } from "../../domain/dto/grado/update-grado.dto";
import { GradoEntity } from "../../domain/entities";
import { GradoService } from "../../domain/service/grado.service";
import { Controller } from "../base.controller";

export class GradoController extends Controller
<GradoEntity, CreateGradoDTO, UpdateGradoDTO, PatchGradoDTO>
{
    constructor(service: GradoService){
        super(service, CreateGradoDTO, UpdateGradoDTO, PatchGradoDTO);
    }
}