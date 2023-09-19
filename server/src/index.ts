import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import schema from './schema';
import resolvers from './resolvers';
import http from 'http';
import cors from 'cors';
import pkg from 'body-parser';
import { readDB,DBFIELDS } from './dbcontroller';
const { json } = pkg;

(async () => {
  const app = express();
  const httpServer = http.createServer(app);
 
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],

  });

  /**
    {
      typeDefs: schema,
      resolvers,
      context: {
        
      }
    }
   */


  await server.start();
  app.use(
    '/graphql',
    cors<cors.CorsRequest>({
      origin: ['http://localhost:3000', 'https://studio.apollographql.com/sandbox/explorer'],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async({req, res}) => ({
        db: {
          products: readDB(DBFIELDS.PRODUCTS),
          cart: readDB(DBFIELDS.CART)
        }
      })
    }),
  )
  await new Promise<void>((resolve) => httpServer.listen({ port: 8000 }, resolve));
  console.log("Server is running on localhost:8000");
})();

