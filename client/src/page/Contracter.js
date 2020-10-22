import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getContracter } from '../redux/actions/profileAction';
import InfoCard from '../components/InfoCard';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '6rem',
  },
  text: {
    textAlign: 'center',
    margin: '1rem 0',
  },
}));
const Customers = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.getContracter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contracter, loading } = props.info;

  return (
    <Container className={classes.container}>
      <Grid container>
        {loading ? (
          <Typography variant="h1">Loading</Typography>
        ) : contracter.data && contracter.data.length > 0 ? (
          contracter.data.map((item) => <InfoCard item={item} key={item._id} />)
        ) : (
          <Typography className={classes.text}>No Contracter found</Typography>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
});

const mapActionsToProps = {
  getContracter,
};

export default connect(mapStateToProps, mapActionsToProps)(Customers);
