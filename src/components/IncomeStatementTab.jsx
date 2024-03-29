import React from 'react';
import { withStyles, Grid, Card, CardContent, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
});

function IncomeStatementTab(props) {
    const { classes, ticker: { profile: {companyName}, incomeStatement } } = props;
    console.log(incomeStatement);
    const reference = Object.keys(incomeStatement);
    if (!reference || !reference.length){
        return null
    }
    const years = Object.keys(incomeStatement[reference[0]]).reverse();
    // const rows = ["Revenue", "Net income"];
    const rows = Object.keys(incomeStatement);
    return (

        <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card className={classes.fullheight}>
                <CardContent className={classes.tradingviewwidget}>
                    <Paper className={classes.root}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell key="name">{companyName}</TableCell>
                                    { years.map(year => (<TableCell key={year}>{year}</TableCell>)) }
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map(key => {
                                        const row = incomeStatement[key];
                                        return (
                                            <TableRow key={key}>
                                                <TableCell key={key}>{key}</TableCell>
                                                {years.map(year => (
                                                    <TableCell key={year}>{row[year]}</TableCell>
                                                ))}
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default withStyles(styles)(IncomeStatementTab);