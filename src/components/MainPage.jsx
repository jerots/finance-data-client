import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
 
});

function MainPage(props) {
  const { ticker } = props;
  return (
    <div>
      <h1>{ticker.ticker.name}</h1>
      {/* { JSON.stringify(ticker) } */}
    </div>
  );
}

MainPage.propTypes = {
  ticker: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainPage);
