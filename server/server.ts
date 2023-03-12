import express from 'express';
// import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolver';
// import mongoose from 'mongoose';
import mongoose, { ConnectOptions } from "mongoose";
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

interface MyContext {
  token?: string;
}

async function startServer() {
  const app = express();

  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app);


  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.
  const apolloServer =
    new ApolloServer({
      // typeDefs: typeDefs,
      // resolvers: resolvers
      // csrfPrevention: false,
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

  // RECOMMENDED: start before listening any port
  await apolloServer.start();

  // apolloServer.applyMiddleware({ app: app, path: '/truly' });
  // Set up our Express middleware to handle CORS, body parsing,
  // and our expressMiddleware function.
  // const newCors = cors<cors.CorsRequest>()
  // const corsOptions = {
  //   origin: ['http://localhost:3000/', "https://studio.apollographql.com"],
  // credentials: true
  // }
  app.use(
    '/',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),

  );




  // inside async function, we can use await
  await mongoose.connect('mongodb://127.0.0.1/post_db', {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
  } as ConnectOptions)
    .then((res) => {
      console.log(
        'Connected to Distribution API Database - Initial Connection'
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });;

  console.log('Mongoose connected...');

  // app.listen(4000, () => console.log('Server is running in port 4000'));

  // Modified server startup
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/`);
}

startServer();
