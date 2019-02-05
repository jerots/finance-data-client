import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { Grid, CardContent, Card } from '@material-ui/core';

const styles = theme => ({
  fullheight: {
    height: "100%"
  },
  tradingviewwidget: {
    height: "500px"
  }
});

function MainPage(props) {
  const { classes, ticker } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.fullheight}>
            <CardContent>
              <h1>{ticker.profile.companyName.toUpperCase()}</h1>
              <h2>Price: ${ticker.profile.Price} {ticker.profile.ChangesPerc}</h2>
              <h2>Intrinsic Value (DCF): ${ticker.dcf}</h2>
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
