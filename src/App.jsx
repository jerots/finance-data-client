import React, { Component } from 'react';
import './App.css';
import HeaderBar from "./components/SearchAppBar.jsx"
import { ApolloProvider, Query } from "react-apollo";
import { client } from "./index.js";
import gql from "graphql-tag"
import MainPage from './components/MainPage';
import LinearIndeterminate from './components/LinearIndeterminate';
import * as _ from "lodash";
import { MuiThemeProvider } from '@material-ui/core';
import theme from './theme';

const LOAD_TICKER = gql`
 query ($tickerName: String!){
    ticker(tickerName:$tickerName) {
      name
      dcf
      incomeStatement
      balanceSheet
      dcf
      rating
      cashFlowStatement
      profile
    }
        }
`

const GET_TICKER_NAME = gql`
  {
    tickerName @client
  }
`

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.debouncedSetState = _.debounce(this.setState, 500);
  }

  handleChange(event) {
    const value = event.target.value;
    if (!value || !value.trim()) return
    this.debouncedSetState({ tickerName: value })
  }


  render() {
    return (
      <MuiThemeProvider theme={theme}>

        <ApolloProvider client={client}>
          <div className="App">
            <HeaderBar handleChange={this.handleChange} />
            <Query query={GET_TICKER_NAME}>
              {({ loading, error, data: { tickerName } }) => (
                <Query query={LOAD_TICKER} variables={{ tickerName: tickerName }}>
                  {({ loading, error, data }) => {
                    const ticker = _.get(data, "ticker");

                    if (loading) {
                      return <LinearIndeterminate varient="indeterminate" />
                    }

                    ticker.symbol = ticker.name
                    if (!ticker || error) return <p>Stock not found</p>;



                    return (
                      <div>
                        <MainPage ticker={ticker} />
                      </div>
                    )
                  }}
                </Query>
              )}
            </Query>
  
          </div>
        </ApolloProvider>
      </MuiThemeProvider>

        );
      }
    }
    
    export default App;
