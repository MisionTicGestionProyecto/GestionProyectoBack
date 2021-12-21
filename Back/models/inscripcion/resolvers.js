import { ProjectModel } from '../proyecto/proyecto.js';
import { UserModel } from '../usuario/usuario.js';
import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {
  Inscripcion: {
    proyecto: async (parent, args, context) => {
      return await ProjectModel.findOne({ _id: parent.proyecto });
    },
    estudiante: async (parent, args, context) => {
      return await UserModel.findOne({ _id: parent.estudiante });
    },
  },
  Query: {
    Inscripciones: async (parent, args, context) => {
      let filtro = {};
      if (context.userData) {
        if (context.userData.rol === 'LIDER') {
          const projects = await ProjectModel.find({ lider: context.userData._id });
          const projectList = projects.map((p) => p._id.toString());
          filtro = {
            proyecto: {
              $in: projectList,
            },
          };
        }
      }
      const inscripciones = await InscriptionModel.find({ ...filtro });
      return inscripciones;
    },

  },
  Mutation: {
    crearInscripcion: async (parent, args) => {
      const inscripcionCreada = await InscriptionModel.create({
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      });
      return inscripcionCreada;
    },

    aprobarInscripcion: async (parent, args) => {
      const inscripcionAprobada =  await InscriptionModel.findByIdAndUpdate(args.id,{
        estado: "ACEPTADO",
        fechaIngreso: Date.now(),
      },
      { new: true }
      );
      return inscripcionAprobada;
    },

    editarInscripcion: async (parent, args) => {
      const inscripcionEditada = await InscriptionModel.findByIdAndUpdate(args._id, {
        estado: args.estado,
        fechaIngreso: args.fechaIngreso,
        fechaEgreso: args.fechaEgreso,
        proyecto: args.proyecto,
        estudiante: args.estudiante,
      },
      { new: true }
      );
          return inscripcionEditada;
   },
   eliminarInscripcion: async (parent, args) => {
       const inscripcionEliminada = await InscriptionModel.findByIdAndDelete(args._id);
        return inscripcionEliminada;
    
    },
},


};


export { resolverInscripciones };
