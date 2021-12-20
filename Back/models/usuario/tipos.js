import { gql } from 'apollo-server-express';


const tiposUsuario = gql `

type Usuario {
    _id: ID!
    nombre: String! 
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario
    rol: Enum_Rol!
    inscripciones: [Inscripcion]
    proyectosLiderados: [Proyecto]
    avancesCreados: [Avance]
    }
    input FiltroUsuarios {
    _id: ID
    identificacion: String
    correo: String
    rol: Enum_Rol
    estado: Enum_EstadoUsuario
  }

  input CamposEditarPerfil {
    nombre: String
    apellido: String
    identificacion: String
    foto: String
  }

type Query{
    Usuarios(filtro: FiltroUsuarios): [Usuario]
    Usuario(_id: String!): Usuario
  }

type Mutation{

    crearUsuario(
    nombre: String! 
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario
    rol: Enum_Rol!
    password: String!
    ): Usuario

    eliminarUsuario(
        _id: String,
        correo: String
    ): Usuario

    editarUsuario(
        _id: String!
        nombre: String! 
        apellido: String!
        identificacion: String!
        correo: String!
        estado: Enum_EstadoUsuario!
    ): Usuario
    editarPerfil(_id: String!, campos: CamposEditarPerfil!): Usuario
}
`;

export { tiposUsuario };