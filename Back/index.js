import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv';//variable de entorno
import conectarBD from './db/db.js';
import { tipos } from './graphql/types.js';
import { resolvers } from './graphql/resolvers.js';

dotenv.config();//para que se ejecute 

const server = new ApolloServer({
    typeDefs: tipos,
    resolvers: resolvers,
});

const app = express();

app.use(express.json());

app.use(cors());

app.listen({ port: process.env.PORT || 4000 }, async () => {
    await conectarBD();
    await server.start();//prender servidor
    
    server.applyMiddleware({ app });

    console.log('servidor listo');
});

