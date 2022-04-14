const express = require('express');
// IMPORT APOLLO-SERVER
const { ApolloServer } = require('apollo-server-express');

// IMPORT OUR TYPE-DEFS AND RESOLVERS + AUTH MIDDLEWARE
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schema');
const path = require('path');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // CREATE A NEW APOLLO SERVER AND PASS IN SCHEMA DATA
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
  });
  // START THE APOLLO SERVER
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
//START THE APOLLO SERVER
startServer();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// IF WE'RE IN PRODUCTION, SERVE CLIENT/BUILD AS STATIC ASSETS
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// WHEN SET UP CONSOLE LOG THE APPROPRIATE PATHS
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
