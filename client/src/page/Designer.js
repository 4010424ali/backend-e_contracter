import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getDesigner } from '../redux/actions/profileAction';
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
    props.getDesigner();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { designer, loading } = props.info;

  return (
    <Container className={classes.container}>
      <Grid container>
        {loading ? (
          <Typography variant="h1">Loading</Typography>
        ) : designer.data && designer.data.length > 0 ? (
          designer.data.map((item) => <InfoCard item={item} key={item._id} />)
        ) : (
          <Typography className={classes.text}>No Desginer found</Typography>
        )}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  info: state.info,
});

const mapActionsToProps = {
  getDesigner,
};

export default connect(mapStateToProps, mapActionsToProps)(Customers);
