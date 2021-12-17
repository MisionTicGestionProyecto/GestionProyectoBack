import { UserModel } from '../../models/usuario/usuario.js';
import bcrypt from 'bcrypt';




const resolversAutenticacion = {
    Mutation: {
        registro: async (parent, args) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const usuarioCreado = await UserModel.create({
            nombre: args.nombre,
            apellido: args.apellido,
            correo: args.correo,
            identificacion: args.identificacion,
            rol: args.rol,
            password: hashedPassword,
            }); 
        return {
            token: generateToken({
            _id: usuarioCreado._id,
            nombre: usuarioCreado.nombre,
            apellido: usuarioCreado.apellido,
            identificacion: usuarioCreado.identificacion,
            correo: usuarioCreado.correo,
            rol: usuarioCreado.rol,
            }),
        }
 
    },
    
    login: async (parent, args) => {
        const usuarioEncontrado = await UserModel.findOne({ correo: args.correo });
        if (await bcrypt.compare(args.password, usuarioEncontrado.password)) {
          return {
            token: generateToken({
              _id: usuarioEncontrado._id,
              nombre: usuarioEncontrado.nombre,
              apellido: usuarioEncontrado.apellido,
              identificacion: usuarioEncontrado.identificacion,
              correo: usuarioEncontrado.correo,
              rol: usuarioEncontrado.rol,
              foto: usuarioEncontrado.foto,
            }),
          };
        }
    },
  }, 
};

export {resolversAutenticacion};