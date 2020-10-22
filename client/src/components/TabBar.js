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
import { connect, useSelector } from 'react-redux';

import TabPanel from '../utils/TabPanel';
import Customer from './Cutomer';

import {
  completeProject,
  closeProject,
  getActivePerposal,
  getClosePerposal,
} from '../redux/actions/dataAction';

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
  text: {
    textAlign: 'center',
    margin: '1rem 0',
  },
}));

const TabBar = (props) => {
  const [value, SetValue] = useState(0);
  const classes = useStyle();
  const theme = useTheme();
  const user = useSelector((state) => state.user);

  const {
    loading,
    completeProject,
    closeProject,
    activePerposal,
    closePerposal,
  } = props.data;
  const { authenticated, data } = user;

  useEffect(() => {
    props.completeProject(props.id);
    props.closeProject(props.id);

    if (authenticated && data.role === 'publisher') {
      props.getActivePerposal();
      props.getClosePerposal();
    }

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
                {data.role === 'publisher' ? (
                  loading ? (
                    <Typography>Loading...</Typography>
                  ) : activePerposal.data && activePerposal.data.length >= 1 ? (
                    activePerposal.data.map((item) => (
                      <React.Fragment key={item._id}>
                        <Customer item={item.customers} key={item.id} />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography>
                      No project found, Please submit the perposal
                    </Typography>
                  )
                ) : loading ? (
                  <Typography variant="h1">Loading</Typography>
                ) : completeProject.data && completeProject.data.length >= 1 ? (
                  completeProject.data.map((item) => (
                    <Customer item={item} key={item.id} />
                  ))
                ) : (
                  <Typography variant="h6" className={classes.text}>
                    No project found, Please Submit the project
                  </Typography>
                )}
              </Grid>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Container>
              <Grid container>
                {data.user ? (
                  loading ? (
                    <Typography>Loading...</Typography>
                  ) : closePerposal.data && closePerposal.data.length >= 1 ? (
                    closePerposal.data.map((item) => (
                      <React.Fragment key={item._id}>
                        <Customer item={item.customers} key={item.id} />
                      </React.Fragment>
                    ))
                  ) : (
                    <Typography>
                      No project found, Please submit the perposal
                    </Typography>
                  )
                ) : loading ? (
                  <Typography variant="h1">Loading</Typography>
                ) : closeProject.data && closeProject.data.length >= 1 ? (
                  closeProject.data.map((item) => (
                    <Customer item={item} key={item.id} />
                  ))
                ) : (
                  <Typography variant="h6" className={classes.text}>
                    No project found, Please Submit the project
                  </Typography>
                )}
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

export default connect(mapStateToProps, {
  completeProject,
  closeProject,
  getActivePerposal,
  getClosePerposal,
})(TabBar);
