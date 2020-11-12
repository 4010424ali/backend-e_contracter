import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MainNavbar from '../components/layout/MainNavbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const useStyle = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Dashboard = () => {
  const classes = useStyle();
  const percentage = 75;
  return (
    <>
      <MainNavbar>
        <Container>
          <Grid container className={classes.root} spacing={2}>
            <Grid item md={6} spacing={6}>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
              <Typography
                style={{ textAlign: 'center', marginTop: '10px' }}
                variant="h4"
                component="h4"
              >
                Compelation Rate
              </Typography>
            </Grid>
            <Grid item md={6} spacing={4}>
              <CircularProgressbar value={percentage} text={`${percentage}%`} />
            </Grid>
          </Grid>
        </Container>
      </MainNavbar>
    </>
  );
};

export default Dashboard;
