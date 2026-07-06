import express, { Express, Router } from "express";


interface Options {
    port    : number;
    routes  : Router;
}


export class AppServer {
    private app : Express;
    private port : number;
    private routes: Router;


    constructor(options: Options){
        const {port, routes} = options;
        this.port   = port;
        this.routes = routes;
        this.app = express();
    }


    async start(){
        //  MIDDLEWARES
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
        

        //  ROUTES
        this.app.use(this.routes);

        
        this.app.get("/", (req,res)=>{
            res.json({mensaje:"hola"});
        })


        //  ARRANCAR APP
        this.app.listen(this.port, ()=>{
            console.log(`Server running on http://localhost:${this.port}`);
        })
    }
}