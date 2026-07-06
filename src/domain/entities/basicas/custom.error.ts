export class CustomError extends Error {
    constructor(
        public readonly statusCode : number,
        public readonly message : string,
        public readonly details? : any          // OPCIONAL : Información extra
    ) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);  
    }
    
    // new target apunta al constructor que realmente se invoco
    // console.log(err instanceof CustomError);     // ✅ true
    // console.log(err instanceof Error);           // ✅ true


    static badRequest(message: string, details?: any){
        return new CustomError(400, message, details);
    }


    static unauthorized(message: string) {
        return new CustomError(401, message);
    }

    
    static forbidden(message: string){
        return new CustomError(403, message);
    }


    static notFound(message: string){
        return new CustomError(404, message);
    }

    
    static conflict(message: string) {
        return new CustomError(409, message);
    }


    static unprocessable(message: string, details?: any) {
        return new CustomError(422, message, details);
    }


    static internalServer(message: string) {
        return new CustomError(500, message);
    }
}