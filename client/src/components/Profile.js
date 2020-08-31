import React from 'react';
import { Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';

import Navbar from './layout/Navbar';

import TabBar from './TabBar';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
  const user = useSelector((state) => state.user);

  const { loading } = user;
  return (
    <Grid container>
      <Grid item lg={2}>
        <Navbar />
      </Grid>
      <Grid item lg={10}>
        <ProfileInfo />
        {loading ? <h1>Loading</h1> : <TabBar id={user.data._id} />}
      </Grid>
    </Grid>
  );
};

export default Profile;
