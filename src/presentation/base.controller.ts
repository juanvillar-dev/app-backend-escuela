import { Request, Response } from "express";
import { Service } from "../domain/service/service";
import { CustomError } from "../domain/entities";
import { DTOClass } from "../domain/dto/dto";

export abstract class Controller <TEntity, TCreateDTO, TUpdateDTO, TPatchDTO>{
    constructor (
        protected readonly service: Service<TEntity, TCreateDTO, TUpdateDTO, TPatchDTO>,
        private createDto: DTOClass<TCreateDTO>,
        private updateDto: DTOClass<TUpdateDTO>,
        private patchDto: DTOClass<TPatchDTO>,
    ){}

    
    protected createDTO(obj: any): TCreateDTO {
        return this.createDto.create(obj);
    }

    protected updateDTO(obj: any): TUpdateDTO {
        return this.updateDto.create(obj);
    }

    protected patchDTO(obj: any): TPatchDTO {
        return this.patchDto.create(obj);
    }

    // protected abstract createDTO (obj: any) : TCreateDTO;
    // protected abstract updateDTO (obj: any) : TUpdateDTO;



    public findAll = async (req: Request, res: Response) => {
        try {
            const resultados = await this.service.findAll();
            console.log("controller basico - findAll");
            console.log(resultados);
            
            res.json(resultados);

        } catch (err) { this.handleError(err, res)}
    }




    public findById = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id
            const resultado = await this.service.findById(id);
            console.log("controller basico - findById");
            console.log(resultado);
            
            res.json(resultado);

        } catch (err) { this.handleError(err, res)}
    }




    public create = async (req: Request, res: Response) => {
        try {
            const dto = await this.createDTO(req.body);
            console.log("controller basico - create - dto", dto);
            const resultado = await this.service.create(dto);

            res.status(201).json(resultado)
            
        } catch (err) { this.handleError(err, res)}
    }




    public update = async (req: Request, res: Response) => {
        try {
            const dto = await this.updateDTO({...req.body, id: +req.params.id});
            console.log("controller basico - update - dto", dto);
            const resultado = await this.service.update(dto);

            res.json(resultado);
        } catch (err) { this.handleError(err, res)}
    }




    public patch = async (req: Request, res: Response) => {
        try {
            const dto = await this.patchDTO({...req.body, id: +req.params.id});
            console.log("controller basico - patch - dto", dto);
            const resultado = await this.service.patch(dto);

            res.json(resultado);
        } catch (err) { this.handleError(err, res)}
    }




    public deleteById = async (req: Request, res: Response) => {
        try {
            const id = +req.params.id;
            const resultado = await this.service.deleteById(id);
            
            res.json(resultado);
            
        } catch (err) { this.handleError(err, res)}
    }




    protected handleError(err: any, res: Response) {
        if(err instanceof CustomError) {
            res.status(err.statusCode).json({ error : err.message});
        } else {
            console.log('Error inesperado: ', err);
            res.status(500).json({ error : "Error interno del servidor"});
        }

    }
}