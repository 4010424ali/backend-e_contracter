import React, { useState, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import {
  AppBar,
  Tab,
  Tabs,
  Container,
  Grid,
  Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import TabPanel from '../utils/TabPanel';
import Customer from './Cutomer';

import { completeProject, closeProject } from '../redux/actions/dataAction';

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '1005',
    paddingTop: '4.5rem',
    [theme.breakpoints.down('md')]: {
      width: '100vw',
    },
  },
  tab: {
    maxWidth: '100%',
    width: '100%',
  },
}));

const TabBar = (props) => {
  const [value, SetValue] = useState(0);
  const classes = useStyle();
  const theme = useTheme();

  const { loading, completeProject, closeProject } = props.data;

  useEffect(() => {
    props.completeProject(props.id);
    props.closeProject(props.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (e, newValue) => SetValue(newValue);

  const handleChangeIndex = (index) => SetValue(index);
  return (
    <>
      <div className={classes.root}>
        <div className="width">
          <AppBar position="static" color="default" className={classes.appBar}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="Customer info"
            >
              <Tab label="Active Project" {...a11yProps(0)} />
              <Tab label="Close Project" {...a11yProps(1)} />
              <Tab label="Hire Person" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
        </div>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <Container>
              <Grid container>
                {loading ? (
                  <Typography variant="h1">Loading</Typography>
                ) : completeProject.data ? (
                  completeProject.data.map((item) => (
                    <Customer item={item} key={item.id} />
                  ))
                ) : null}
              </Grid>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Container>
              <Grid container>
                {loading ? (
                  <Typography variant="h1">Loading</Typography>
                ) : closeProject.data ? (
                  closeProject.data.map((item) => (
                    <Customer item={item} key={item.id} />
                  ))
                ) : null}
              </Grid>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Container>
              <Typography>Working from Home</Typography>
            </Container>
          </TabPanel>
        </SwipeableViews>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { completeProject, closeProject })(
  TabBar
);
