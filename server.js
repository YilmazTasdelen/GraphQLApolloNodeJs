const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

// check any directory or sub directory with file type .graphql
const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '**/*.resolvers.js'));

function startApolloServer() {
    const app = express();

    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray,
    });

    const server = new ApolloServer({
        schema: schema

    });

    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    app.listen(3000, () => {
        console.log('Running GraphQL server...');
    });
}


startApolloServer();