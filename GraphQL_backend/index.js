var express = require('express');
var graphqlHTTP = require('express-graphql');
var { GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLSchema,GraphQLList } = require('graphql');
const fetch = require('node-fetch');
var GraphQLJSON = require('graphql-type-json');
var cors = require('cors');

//#4 Define the Rocket Object

var RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: {
    info:{type:GraphQLJSON,resolve:res=>res}
  }
});

 
//#3 Define the Launch Object

var LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: {
    mission_name: { type: GraphQLString, resolve:response=>response.mission_name},
    flight_number: { type: GraphQLInt, resolve:response=>response.flight_number },
    rocket_info : { type: RocketType, resolve:response=>fetch('https://api.spacexdata.com/v3/rockets/'+response.rocket.rocket_id).then(res=>res.json())} 
  }
});

//#2 Define the Query Object

var Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    launch: { type: new GraphQLList(LaunchType),
    args:{flight_number:{type:GraphQLInt}},  
    resolve:(root,args)=>fetch('https://api.spacexdata.com/v3/launches/').then(res => res.json())
    }
  }
});

//#1 Define the Schema
var schema = new GraphQLSchema({
  query:Query
})

//#0 Make and express Server with GraphQL middleware.
var app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));