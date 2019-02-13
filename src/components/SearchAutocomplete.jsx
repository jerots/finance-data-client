import React, { Component } from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { ApolloConsumer, Query } from 'react-apollo';

import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import * as _ from "lodash";
import gql from 'graphql-tag';
import { Popper, Paper, MenuItem } from '@material-ui/core';

const styles = theme => ({
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    }
});

const LOAD_TICKERS = gql`
    {
        tickers
    }
`

class SearchAutoComplete extends Component {
    constructor(props) {
        super(props)
        this.state = { selectedValue: "", suggestions: [], popper: "" }
    }

    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <Query query={LOAD_TICKERS}>
                {({ loading, error, data: { tickers } }) => (
                    <ApolloConsumer>
                        {client => {
                            if (!tickers) return null;
                            // console.log('tickers', tickers);

                            return (
                                <Autosuggest
                                    focusInputOnSuggestionClick={false}
                                    onSuggestionsFetchRequested={({ value, reason }) => {
                                        const suggestions = _.chain(tickers)
                                            .map(ticker => ({
                                                value: ticker.Ticker,
                                                label: ticker.Name,
                                            }))
                                            .filter(ticker => {
                                                const toCompare = (ticker.label + ticker.value).trim().toLowerCase();
                                                return toCompare.includes(value.trim().toLowerCase())
                                            })
                                            .value()
                                            .slice(0, 5)
                                        this.setState({ suggestions })
                                    }}
                                    onSuggestionsClearRequested={() => { this.setState({ suggestions: [] }) }}
                                    onSuggestionSelected={(event, { suggestion }) => {
                                        client.writeData({ data: { tickerName: suggestion.value } })
                                    }}
                                    getSuggestionValue={(suggestion) => suggestion.label}
                                    suggestions={this.state.suggestions}
                                    inputProps={{
                                        // value: this.state.selectedValue,
                                        // onChange: (event) => {
                                        //     const selectedValue = event.target.value;
                                        //     this.setState({ selectedValue });
                                        // },
                                        classes,
                                        label: 'Label',
                                        placeholder: 'Search...',
                                        value: this.state.popper,
                                        onChange: this.handleChange('popper'),
                                        inputRef: node => {
                                            this.popperNode = node;
                                        },
                                    }}
                                    renderSuggestion={(suggestion, { query, isHighlighted }) => {
                                        const matches = match(suggestion.label, query);
                                        const parts = parse(suggestion.label, matches);

                                        return (
                                            <MenuItem selected={isHighlighted} component="div">
                                                <div>
                                                    {parts.map((part, index) =>
                                                        part.highlight ? (
                                                            <span key={String(index)} style={{ fontWeight: 500 }}>
                                                                {part.text}
                                                            </span>
                                                        ) : (
                                                                <strong key={String(index)} style={{ fontWeight: 300 }}>
                                                                    {part.text}
                                                                </strong>
                                                            ),
                                                    )}
                                                </div>
                                            </MenuItem>
                                        );
                                    }}
                                    renderInputComponent={(inputProps) => (
                                        <InputBase
                                            placeholder="Search…"
                                            {...inputProps}
                                            // onChange={(event) => {
                                            //     const value = event.target.value;
                                            //     if (!value || !value.trim()) return
                                            //     client.writeData({ data: { tickerName: value } })
                                            // }}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}

                                        />
                                    )}
                                    renderSuggestionsContainer={options => {
                                        return (
                                            <div>
                                                <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
                                                    <Paper
                                                        square
                                                        {...options.containerProps}
                                                        style={{ width: this.popperNode ? this.popperNode.clientWidth : null }}
                                                    >
                                                        {options.children}
                                                    </Paper>
                                                </Popper>
                                            </div>

                                        )
                                    }}
                                    theme={{
                                        suggestionsList: classes.suggestionsList,
                                        suggestion: classes.suggestion,
                                    }}

                                />
                            )
                        }
                        }
                    </ApolloConsumer>
                )}
            </Query>

        );
    }

}

SearchAutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAutoComplete);
