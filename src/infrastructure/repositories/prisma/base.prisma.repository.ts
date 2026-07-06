import { prisma } from "../../../config/prisma";
import { CustomError } from "../../../domain/entities";
import { Repository } from "../../../domain/repositories/repository";

export abstract class BasePrismaRepository <TEntity, TCreateDTO, TUpdateDTO> 
implements Repository<TEntity, TCreateDTO, TUpdateDTO>{
    
    protected abstract model: any;
    protected abstract toEntity(obj: any): TEntity;
    
    
    async findById(id: number): Promise<TEntity | null> {
        const resultado = await this.model.findUnique({where: {id}});
        return resultado
            ? this.toEntity(resultado)
            : null;
    }
    
    
    async findAll(): Promise<TEntity[]> {
        const resultados = await this.model.findMany();
        return resultados.map(this.toEntity);    
    }


    async create(dto: TCreateDTO): Promise<TEntity> {
        try {
            const resultado = this.model.create({data: dto});
            return this.toEntity(resultado);
        } catch (err : any) {
            throw CustomError.internalServer("Error con base prisma al crear"+err.message);
        }
    }


    update(dto: TUpdateDTO): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }

    
    async deleteById(id: number): Promise<TEntity | null> {
        const deleted = await this.model.delete({ where: { id } });
        return this.toEntity(deleted);
    }
    
}