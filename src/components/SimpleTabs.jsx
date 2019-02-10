import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import IncomeStatementTab from './IncomeStatementTab';
import { Query, ApolloConsumer } from 'react-apollo';
import gql from 'graphql-tag';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

const GET_TAB_VALUE = gql`
    {
        tabValue @client
    }
`

function SimpleTabs(props) {
    const { classes, ticker } = props;

    return (
        <div className={classes.root}>
            <Query query={GET_TAB_VALUE}>
                {({ data: { tabValue } }) => (
                    <div>
                        <AppBar position="static">
                            <ApolloConsumer>
                                {client => (
                                    <Tabs value={tabValue} onChange={(event, newValue) => client.writeData({data: { tabValue: newValue }})}>
                                        <Tab label="Income Statement" />
                                        <Tab label="Balance Sheet" />
                                        <Tab label="Cashflow statement" />
                                    </Tabs>
                                )}
                            </ApolloConsumer>
                        </AppBar>
                        {tabValue === 0 && <TabContainer><IncomeStatementTab ticker={ticker} /></TabContainer>}
                        {tabValue === 1 && <TabContainer>Balance Sheet</TabContainer>}
                        {tabValue === 2 && <TabContainer>Cashflow statement</TabContainer>}
                    </div>
                )}
            </Query>


        </div>
    );
}

export default withStyles(styles)(SimpleTabs);