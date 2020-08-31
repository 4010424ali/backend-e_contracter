import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getCustomers } from '../redux/actions/dataAction';
import Customer from '../components/Cutomer';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '6rem',
  },
}));
const Customers = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, loading } = props.data.customers;

  return (
    <Container className={classes.container}>
      <Grid container>
        {loading ? (
          <Typography variant="h1">Loading</Typography>
        ) : data ? (
          data.map((item) => <Customer item={item} key={item.id} />)
        ) : null}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getCustomers,
};

export default connect(mapStateToProps, mapActionsToProps)(Customers);
