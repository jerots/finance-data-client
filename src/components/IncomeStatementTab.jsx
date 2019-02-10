import React from 'react';
import { withStyles, Grid, Card, CardContent } from '@material-ui/core';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';

const styles = theme => ({
    root: {
      
    },
    tradingviewwidget: {
        height: "500px"
    },
});

function IncomeStatementTab(props) {
    const { classes, ticker } = props;

    return (

        <Grid item xs={12} sm={12} md={9} lg={6}>
            <Card className={classes.fullheight}>
                <CardContent className={classes.tradingviewwidget}>
                    <TradingViewWidget symbol={ticker.symbol} theme={Themes.DARK} autosize />
                </CardContent>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(IncomeStatementTab);