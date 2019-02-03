import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
 
});

function MainPage(props) {
  const { ticker } = props;
  console.log(ticker)
  return (
    <div>
      <h1>{ticker.companyName.toUpperCase()}</h1>
      <h2>Price: ${ticker.price} {ticker.ChangesPerc}</h2>
      <h2>Intrinsic Value (DCF): ${ticker.DCF}</h2>

      <p>{ticker.description}</p>

    </div>
  );
}

MainPage.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);
