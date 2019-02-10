import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import IncomeStatementTab from './IncomeStatementTab';

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

function SimpleTabs(props) {
    const { classes, ticker } = props;
    let value = 0;
    function handleChange(event, newValue) {
        value = newValue;
        console.log(newValue)
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Income Statement" />
                    <Tab label="Balance Sheet" />
                    <Tab label="Cashflow statement" />
                </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><IncomeStatementTab ticker={ticker}/></TabContainer>}
            {value === 1 && <TabContainer>Balance Sheet</TabContainer>}
            {value === 2 && <TabContainer>Cashflow statement</TabContainer>}
        </div>
    );
}

export default withStyles(styles)(SimpleTabs);