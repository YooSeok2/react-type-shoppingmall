import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolvers';
//import cors from 'cors';

(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });
  /**
    {
      typeDefs: schema,
      resolvers,
      context: {
        
      }
    }
   */

  const app = express();
  await server.start();
  server.applyMiddleware({
    app:app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000/', 'https://studio.apollographql.com/'],
      credentials: true
    }
  })
  await app.listen({port: 8000});
  console.log("Server is running on localhost:8000");
})();

