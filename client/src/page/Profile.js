import React from 'react';
import { Container, Grid, Card, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyle = makeStyles({
  root: {
    flexGrow: 1,
  },
  topSpacing: {
    marginTop: '6rem',
  },
  width: {
    width: '16rem',
  },
});

const Profile = () => {
  const classes = useStyle();
  const user = useSelector((state) => state.user);

  const { data, loading } = user;

  console.log(user);

  return <div className={classes.topSpacing}></div>;
};

export default Profile;
