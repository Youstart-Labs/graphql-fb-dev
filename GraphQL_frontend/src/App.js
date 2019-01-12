
import React from 'react';
import './App.css';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import 'bootstrap/dist/css/bootstrap.css';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});




const Courses = () => (
  <Query
    query={gql`
    {
      launch(flight_number:5) {
        mission_name,
        flight_number,
        rocket_info{
          info
        }
       
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return data.launch.map(({ mission_name,flight_number,rocket_info }) => (
        <div key={flight_number}>
         <div className="btn btn-success btn-block my-2">
              <span>{`Flight No. ${flight_number} : ${mission_name}`}</span>
        </div>
        <div className="btn btn-default btn-block">
              <span>{`Info: ${rocket_info.info.country} | ${rocket_info.info.company}`}</span>
        </div>
        </div>
      ));
    }}
  </Query>
);


const App = () => (
  <ApolloProvider client={client}>
    <div className="container">
      <nav className="navbar navbar-dark bg-primary">
        <span className="navbar-brand">SpaceX flights</span>
      </nav>
      <div>
        <Courses />
      </div>
    </div>
  </ApolloProvider>
);

export default App;



