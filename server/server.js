const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');
const mongoose = require('mongoose');

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    // typeDefs: typeDefs,
    // resolvers: resolvers
    typeDefs,
    resolvers,
  });

  // RECOMMENDED: start before listening any port
  await apolloServer.start();

  apolloServer.applyMiddleware({ app: app, path: '/truly' });

  // express routes
  app.use((req, res) => {
    res.send('Hello from express apollo server');
    console.log('ok');
  });

  // inside async function, we can use await
  await mongoose.connect('mongodb://localhost:27017/post_db', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  console.log('Mongoose connected...');

  app.listen(4000, () => console.log('Server is running in port 4000'));
}

startServer();
