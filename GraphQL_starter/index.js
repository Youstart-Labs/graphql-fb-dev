const express = require('express');
const graphqlHTTP = require('express-graphql');
var {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString
  } = require('graphql');
const app = express();

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'RootQueryType',
      fields: {
        name: {
          type: GraphQLString,
          resolve() {
            return 'abhishek';
          }
        },
          subject: {
            type: GraphQLString,
            resolve() {
              return 'nodejs';
            }
          }
      }
    })
  });


app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.listen(4000);