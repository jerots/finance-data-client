import React from 'react';
import { withStyles, Grid, Card, CardContent } from '@material-ui/core';

const styles = theme => ({
    root: {
      
    },
    tradingviewwidget: {
        height: "500px"
    },
});

function IncomeStatementTab(props) {
    const { classes } = props;

    return (

        <Grid item xs={12} sm={12} md={9} lg={6}>
            <Card className={classes.fullheight}>
                <CardContent className={classes.tradingviewwidget}>
                    <h1>Income statement table here</h1>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(IncomeStatementTab);