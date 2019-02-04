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
          ticker(tickerName:$tickerName)
        }
`
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tickerName: "AAPL"
    }
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
          <Query query={LOAD_TICKER} variables={{ tickerName: this.state.tickerName }}>
            {({ loading, error, data }) => {

              const dataArr = _.get(data, "ticker.data");
              if (!dataArr) return <p>Stock not found</p>;

              const ticker = dataArr[0];
              ticker.symbol = data.ticker.name

              if (error || !ticker) return <p>Stock not found</p>;

              return (
                <div>
                  {loading ? <LinearIndeterminate varient="indeterminate" /> : <MainPage ticker={ticker} />}
                </div>
              )
            }}


          </Query>
          <div>

          </div>
        </div>
      </ApolloProvider>
    </MuiThemeProvider>

    );
  }
}

export default App;
