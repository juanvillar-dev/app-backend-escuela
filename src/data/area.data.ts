import { prisma } from "../config/prisma"

async function createAreas(){
    await prisma.area.create({
        data: { nombre: "Matemáticas" }
    })

    await prisma.area.create({
        data: { nombre: "Ciencias Sociales" }
    })

    await prisma.area.create({
        data: { nombre: "Ciencias Naturales" }
    })

    await prisma.area.create({
        data: { nombre: "Lengua y Literatura" }
    })

    await prisma.area.create({
        data: { nombre: "Arte" }
    })

    await prisma.area.create({
        data: { nombre: "Educación Física" }
    })

    await prisma.area.create({
        data: { nombre: "Tecnología" }
    })
}



async function verAreas() {
    const areas = await prisma.area.findMany()
    return areas;
}

export { createAreas, verAreas }
