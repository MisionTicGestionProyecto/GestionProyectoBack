import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
    Query:{
        Proyectos: async (parent, args) => {
            const proyectos =  await ProjectModel.find().populate( 'avances').populate('inscripciones');//populata para traer el dato
            return proyectos;
        },

        Proyecto: async (parent, args) => {
            const proyecto = await ProjectModel.findOne({_id: args._id});
            return proyecto;
        },
},
    Mutation: {
        crearProyecto: async (parent, args) => {
            const proyectoCreado =  await ProjectModel.create({
            nombre: args.nombre,
            presupuesto: args.presupuesto,
            fechaInicio: args.fechaInicio,
            fechaFin: args.fechaFin,
            estado: args.estado,
            fase: args.fase,
            lider: args.lider,
            objetivos: args.objetivos,
            });
            return proyectoCreado;
        },

        eliminarProyecto: async (parent, args) => {
    if (Object.keys(args).includes('_id')){
        const proyectoEliminado = await ProjectModel.findOneAndDelete({_id: args._id});
        return proyectoEliminado;
    } else if (Object.keys(args).includes('nombre')){
        const proyectoEliminado = await ProjectModel.findOneAndDelete({nombre: args.nombre});
            return proyectoEliminado;
    }
},

        editarProyecto: async (parent, args) => {
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                presupuesto: args.presupuesto,
                fechaInicio: args.fechaInicio,
                fechaFin: args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider: args.lider,
                objetivos: args.objetivos,
    },
    { new: true }
    );
        return proyectoEditado;
},        

},
 
};

export { resolversProyecto };