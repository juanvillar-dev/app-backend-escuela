import { createAreas, verAreas } from "./data/area.data";

console.log("Hola mundo");


(async()=>{
    await pruebas();
})()


async function pruebas() {
    //await createAreas();
    const areas = await verAreas();
    console.log(areas);
}