import { CustomError } from "../entities";
import { Repository } from "../repositories/repository";
import { Service } from "./service";

export abstract class ServiceBase <TEntity, TCreateDTO, TUpdateDTO, TPatchDTO, 
    TRepo extends Repository<TEntity, TCreateDTO, TUpdateDTO, TPatchDTO>> 
implements Service <TEntity, TCreateDTO, TUpdateDTO, TPatchDTO>
{


    constructor (
        protected readonly repo: TRepo
    ){}


    async findById(id: number): Promise<TEntity | null> {
        const resultado = await this.repo.findById(id);
        if(!resultado) throw CustomError.notFound("entidad no encontrada");
        
        return resultado;
    }


    findAll(): Promise<TEntity[]> {
        return this.repo.findAll();
    }



    create(dto: TCreateDTO): Promise<TEntity> {
        return this.repo.create(dto);
    }



    update(dto: TUpdateDTO): Promise<TEntity> {
        return this.repo.update(dto);
    }



    patch(dto: TPatchDTO): Promise<TEntity> {
        return this.repo.patch(dto);
    }



    deleteById(id: number): Promise<TEntity | null> {
        return this.repo.deleteById(id);
    }

}