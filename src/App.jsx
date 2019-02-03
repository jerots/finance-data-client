import React, { Component } from 'react';
import './App.css';
import HeaderBar from "./components/HeaderBar.jsx"
import { ApolloProvider, Query } from "react-apollo";
import { client } from "./index.js";
import gql from "graphql-tag"


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">



            <HeaderBar />

            <div>

            </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
