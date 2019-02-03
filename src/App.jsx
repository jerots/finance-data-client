import React, { Component } from 'react';
import './App.css';
import HeaderBar from "./components/SearchAppBar.jsx"
import { ApolloProvider, Query } from "react-apollo";
import { client } from "./index.js";
import gql from "graphql-tag"
import MainPage from './components/MainPage';
import LinearIndeterminate from './components/LinearIndeterminate';
import * as _ from "lodash";

const LOAD_TICKER = gql`
 query Ticker($tickerName: String!){
          ticker(tickerName:$tickerName)
        }
`
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      tickerName: "AAPL"
    }
    this.handleChange = this.handleChange.bind(this);
    this.debouncedSetState = _.debounce(this.setState, 500);
  }

  handleChange(event) {
    const value = event.target.value;
    if (!value || !value.trim() ) return
    this.debouncedSetState({tickerName: value})
  }


  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <Query query={LOAD_TICKER} variables={{tickerName:this.state.tickerName}}>
            {({ loading, error, data }) => {

              // if (error) return <p>Error :(</p>;

              return (
                <div>
                  <HeaderBar handleChange={this.handleChange} />
                  { loading ? <LinearIndeterminate varient="indeterminate"/> : <MainPage ticker={data} /> }
                </div>
              )
            }}


          </Query>
          <div>

          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
