import { gql } from 'apollo-server-express';

const tiposAutenticacion = gql`

type Token {
    token: String
    error: String
}

type Mutation{
    registro(
    nombre: String! 
    apellido: String!
    identificacion: String!
    correo: String!
    estado: Enum_EstadoUsuario
    rol: Enum_Rol!
    password: String!
    ): Token!

    login(
    correo: String!, 
    password: String! 
    ): Token

    refreshToken: Token
}
`;
 export{tiposAutenticacion};