export class SeccionDetalleDTO {
    constructor(
        public readonly id: number,
        public nombre: string,
        public year: number,
        public activo: boolean,
        public numeroAlumnos: number,
        public grado: {
            id: number;
            nivel: string;
            year: number;
            materias: { id: number; nombre: string; area: string }[];
        },
        public tutor: {
            id: number;
            nombre: string;
            apellido: string;
            email: string;
        },
        public alumnos: {
            id: number;
            nombre: string;
            apellido: string;
            email: string;
        }[],
        public horarios: {
            id: number;
            materia: { id: number; nombre: string, area: string };
            docente: { id: number; nombre: string; apellido: string; email: string };
            diaSemana: string;
            horaInicio: Date;
            horaFin: Date;
        }[],
    ) {}

    static fromPrisma(obj: any): SeccionDetalleDTO {
        return new SeccionDetalleDTO(
            obj.id,
            obj.nombre,
            obj.year,
            obj.activo,
            obj._count.alumnos,
            {
                id: obj.grado.id,
                nivel: obj.grado.nivel,
                year: obj.grado.year,
                materias: obj.grado.materias.map((gm: any) => ({
                    id: gm.materia.id,
                    nombre: gm.materia.nombre,
                    area: gm.materia.area.nombre
                })),
            },
            {
                id: obj.tutor.id,
                nombre: obj.tutor.usuario.nombre,
                apellido: obj.tutor.usuario.apellido,
                email: obj.tutor.usuario.email,
            },
            obj.alumnos.map((sa: any) => ({
                id: sa.alumno.id,
                nombre: sa.alumno.usuario.nombre,
                apellido: sa.alumno.usuario.apellido,
                email: sa.alumno.usuario.email,
            })),
            obj.horarios.map((h: any) => ({
                id: h.id,
                materia: { 
                    id: h.materia.id, 
                    nombre: h.materia.nombre, 
                    area: h.materia.area.nombre 
                },
                docente: {
                    id: h.docente.id,
                    nombre: h.docente.usuario.nombre,
                    apellido: h.docente.usuario.apellido,
                    email: h.docente.usuario.email,
                },
                diaSemana: h.diaSemana,
                horaInicio: h.horaInicio,
                horaFin: h.horaFin,
            })),
        );
    }
}
