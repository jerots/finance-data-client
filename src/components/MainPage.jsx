import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Grid, CardContent, Card } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const styles = theme => ({
  fullheight: {
    height: "100%"
  },
  tradingviewwidget: {
    height: "500px"
  },
  positive: {
    color: "green"
  },
  negative: {
    color: "red"
  }
});

function MainPage(props) {
  const { classes, ticker } = props;

  const positive = (num) => {
    console.log(num);
    return num > 0;
  };
  
  
  const marginOfSafety = () => {
    const difference = ticker.dcf - ticker.profile.Price
    const mos = difference / ticker.profile.Price * 100;
    return mos.toFixed(2) ;
  } 
  
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.fullheight}>
            <CardContent>
              <h1>{ticker.profile.companyName.toUpperCase()}</h1>
              <h2 className={positive(ticker.profile.Changes) ? classes.positive : classes.negative}>Price: ${ticker.profile.Price} {ticker.profile.ChangesPerc}</h2>
              <h3 className={positive(marginOfSafety()) ? classes.positive : classes.negative}>Intrinsic Value (DCF): ${ticker.dcf} (MOS: {marginOfSafety()}%)</h3>
              <p>{ticker.profile.description}</p>
              <p>{ticker.description}</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={6}>
          <Card className={classes.fullheight}>
            <CardContent className={classes.tradingviewwidget}>
              <TradingViewWidget symbol={ticker.symbol} theme={Themes.DARK} autosize />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

MainPage.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);
