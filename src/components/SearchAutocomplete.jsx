import React from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import { ApolloConsumer } from 'react-apollo';

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
});

function SearchAutoComplete(props) {
    const { classes } = props;

    return (
        <ApolloConsumer>
            {client => {
                return (
                    <InputBase
                        placeholder="Search…"
                        onChange={(event) => {
                            const value = event.target.value;
                            if (!value || !value.trim()) return
                            client.writeData({ data: { tickerName: value } })
                        }}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                )
            }
            }
        </ApolloConsumer>
    );
}

SearchAutoComplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchAutoComplete);
