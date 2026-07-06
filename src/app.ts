import { createAreas, verAreas } from "./data/area.data";
import { AppRoutes } from "./presentation/appRoutes";
import { AppServer } from "./presentation/server";

console.log("Hola mundo");


(async()=>{
    await main();
    await pruebas();
})()




async function main(){
    const server = new AppServer({
        port: 8080,
        routes: AppRoutes.getRoutes
    });

    server.start();
}


async function pruebas() {
    //await createAreas();
    const areas = await verAreas();
    console.log(areas);
}