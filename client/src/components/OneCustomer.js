import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import {
  Typography,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  AppBar,
  Tab,
  Tabs,
  Tooltip,
  Avatar,
  ListItemText,
  Container,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
  CircularProgress,
  TextareaAutosize,
  Snackbar,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Delete,
  EditSharp,
  Close,
  AddCircleRounded,
  ThumbUp,
  ThumbDown,
} from '@material-ui/icons';
import { red, green } from '@material-ui/core/colors';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import SwipeableViews from 'react-swipeable-views';

import {
  getCustomer,
  getPerposal,
  updatePerposal,
  deletePerposal,
  createPerposal,
  perposalAction,
} from '../redux/actions/dataAction';
import { getAllProgresss } from '../redux/actions/progressAction';
import Map from './map/Map';
import TabPanel from '../utils/TabPanel';
import PaperComponent from '../utils/PaperComponent';
import EditCustomer from './EditCustomer';
import Charts from './Charts';
import ChartsItem from './ChartItem';
import AddItem from './AddItem';

const usestyle = makeStyles((theme) => ({
  activeChip: {
    background: green[400],
    color: '#fff',
  },
  closeChip: {
    background: red[900],
    color: '#fff',
  },
  text: {
    textAlign: 'center',
    margin: '1rem 0',
  },
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
  card: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'block',
    marginBottom: 12,
  },
  input: {
    display: 'block',
    width: '100%',
    marginBottom: 12,
  },
  btn: {
    backgroundColor: '#5cdb95',
    color: '#fff',
    marginTop: 12,
    '&:hover': {
      backgroundColor: '#fff',
      color: '#333',
      border: '#5cdb95 2px solid',
      boxShadow: 'none',
      borderRadius: '5px',
    },
  },
  alert: {
    width: '14.4rem',
    marginBottom: 12,
  },
  iconBtn: {
    backgroundColor: '#06425a',
    color: '#fff',
    margin: '15px 15px',
    '&:hover': {
      backgroundColor: '#5cdb95',
      color: '#fff',
      borderRadius: '5px',
    },
  },
}));

const OneCustomer = (props) => {
  const [value, SetValue] = useState(0);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [team, setTeam] = useState(0);
  const [desc, setDesc] = useState('');
  const [id, setId] = useState('');
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const params = useParams();
  const classes = usestyle();
  const theme = useTheme();

  const err = useSelector((state) => state.UI.errors);
  const progressData = useSelector((state) => state.progress.progress.data);
  const { deta, loading } = props.data.customer;
  const { data } = props.data.perposals;
  
  useEffect(() => {
    props.getCustomer(params.id);

    if (props.user.authenticated) {
      props.getPerposal(params.id);
      props.getAllProgresss(params.id);
    }

    if (err) {
      setError(err);
      setOpen(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err]);

  const handleClose = () => setOpen(false);

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (e, newValue) => SetValue(newValue);

  const onChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    }

    if (e.target.name === 'minPrice') {
      setMinPrice(e.target.value);
    }

    if (e.target.name === 'maxPrice') {
      setMaxPrice(e.target.value);
    }

    if (e.target.name === 'team') {
      setTeam(e.target.value);
    }

    if (e.target.name === 'desc') {
      setDesc(e.target.value);
    }
  };

  const handleChangeIndex = (index) => SetValue(index);

  const handleEdit = (item) => {
    if (item) {
      setId(item._id);
      setTitle(item.title);
      setMaxPrice(item.maxPrice);
      setMinPrice(item.minPrice);
      setTeam(item.totalTeamMemeber);
      setDesc(item.description);
      setOpen(true);
    } else {
      setOpen(true);
    }
  };

  const updatePerposal = () => {
    const newData = {
      title,
      minPrice,
      maxPrice,
      totalTeamMemeber: team,
      description: desc,
    };

    props.updatePerposal(id, newData);
    setOpen(false);
  };

  const handleClick = (item) => {
    props.deletePerposal(item._id);
    setSnackBarOpen(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackBarOpen(false);
  };

  const createPerposal = () => {
    const newData = {
      title,
      minPrice,
      maxPrice,
      totalTeamMemeber: team,
      description: desc,
    };

    props.createPerposal(params.id, newData);

    if (error) {
      setOpen(true);
    }

    setOpen(false);
    setError(null);
  };

  const handleAccept = (id) => {
    props.perposalAction(id);
  };

  dayJs.extend(relativeTime);

  return (
    <>
      {loading ? (
        <Typography variant="h1">Loading</Typography>
      ) : deta ? (
        <div className="conatiner">
          <div className="top-padding">
            <div className="grid">
              <div className="grid-component">
                <img
                  className="image"
                  src={`http://localhost:5000/uploads/${deta.user.image}`}
                  alt=""
                />
              </div>
              <div className="grid-component p">
                {props.user && props.user.authenticated ? (
                  props.user.data.role !== 'user' ? (
                    <IconButton
                      disabled={data && data.length >= 1 ? true : false}
                      onClick={handleEdit}
                    >
                      <Tooltip aria-label="Add Perposal" title="add perposal">
                        <AddCircleRounded color="action" />
                      </Tooltip>
                    </IconButton>
                  ) : (
                    <EditCustomer id={params.id} data={deta.customer} />
                  )
                ) : null}
                {deta.customer.status === true ? (
                  <Chip
                    className={classes.activeChip}
                    size="medium"
                    label="Active"
                  />
                ) : (
                  <Chip
                    className={classes.closeChip}
                    size="medium"
                    label="close"
                  />
                )}
                <Typography variant="h3" component="h1">
                  {deta.user.name}
                </Typography>
                <Typography variant="caption">
                  {' '}
                  {dayJs(deta.customer.createdAt).fromNow()}
                </Typography>
                <Typography variant="subtitle1" component="p">
                  Phone: {deta.customer.phone}
                </Typography>
                <Typography variant="body1" component="p">
                  {deta.customer.description}
                </Typography>
              </div>
            </div>
            <Typography className={classes.text} variant="h4" component="h1">
              Project Description
            </Typography>
            <div className="project-grid">
              <div className="grid-item-compoent">
                <List>
                  <ListItem> Project Title: {deta.customer.name} </ListItem>
                  <Divider />
                  <ListItem>Cost: {deta.customer.cost}</ListItem>
                  <Divider />
                  <ListItem>Completion time: {deta.customer.buidTime}</ListItem>
                  <Divider />
                  <ListItem>
                    Job Role:{' '}
                    {deta.customer.role === 'completeHouse'
                      ? 'Contracter'
                      : deta.customer.role}{' '}
                  </ListItem>
                  <Divider />
                  <ListItem>
                    Build your team:{' '}
                    {deta.customer.buildCustomeTeam
                      ? 'Build your team'
                      : 'You can not build Team Go Change the setting of project'}
                  </ListItem>
                </List>
              </div>
              <div className="grid-item-compoent">
                <Map data={deta} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {props.progress.progress && props.progress.progress.count !== 0 ? (
        <Charts data={props.progress.progress.data} id={params.id} />
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              margin: '1rem 0',
            }}
          >
            <Typography>No data Found for graph</Typography>
            <AddItem id={params.id} />
          </div>
        </>
      )}
      <div className="container">
        {props.user.authenticated && props.user.data.role === 'publisher' ? (
          <>
            {props.progress.progress && props.progress.progress.count !== 0 ? (
              <>
                <Typography
                  className={classes.text}
                  variant="h4"
                  component="h2"
                >
                  Chart Details
                </Typography>
                {progressData !== undefined
                  ? progressData.map((pro) => (
                      <ChartsItem key={pro._id} data={pro} />
                    ))
                  : null}
              </>
            ) : null}
          </>
        ) : null}
      </div>
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
              <Tab label="All Proposals" {...a11yProps(0)} />
              <Tab label="Select perposal" {...a11yProps(1)} />
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
              <List className={classes.card}>
                {props.user.authenticated ? (
                  data && data.length > 0 ? (
                    data.map((item) => (
                      <div key={item._id}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              src={`http://localhost:5000/uploads/${item.user.image}`}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={item.title}
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  {dayJs(item.createdAt).fromNow()}
                                </Typography>
                                {props.user.authenticated ? (
                                  props.user.data &&
                                  props.user.data.role === 'publisher' ? (
                                    <>
                                      <IconButton
                                        onClick={() => handleClick(item)}
                                      >
                                        <Delete color="error" />
                                      </IconButton>
                                      <IconButton
                                        onClick={() => handleEdit(item)}
                                      >
                                        <EditSharp color="action" />
                                      </IconButton>
                                    </>
                                  ) : null
                                ) : null}
                                {props.user.authenticated ? (
                                  props.user.data &&
                                  props.user.data.role === 'user' ? (
                                    <Button
                                      variant="contained"
                                      size="small"
                                      startIcon={
                                        item.accept === 'yes' ? (
                                          <ThumbDown />
                                        ) : (
                                          <ThumbUp />
                                        )
                                      }
                                      className={classes.iconBtn}
                                      onClick={() => handleAccept(item._id)}
                                    >
                                      {item.accept === 'yes'
                                        ? 'Reject Perposal'
                                        : 'Accept perposal'}
                                    </Button>
                                  ) : null
                                ) : null}

                                {item.status === true ? (
                                  <Chip
                                    size="small"
                                    label="open"
                                    component="span"
                                    className={classes.activeChip}
                                  />
                                ) : (
                                  <Chip
                                    size="small"
                                    label="close"
                                    component="span"
                                    className={classes.closeChip}
                                  />
                                )}
                                <Typography
                                  variant="body2"
                                  component="span"
                                  className={classes.inline}
                                  color="textPrimary"
                                >
                                  perposal status:{' '}
                                  {item.accept === 'no' ? (
                                    <Chip
                                      size="small"
                                      label="pending..."
                                      component="span"
                                    />
                                  ) : (
                                    <Chip
                                      size="small"
                                      label="Accept"
                                      component="span"
                                    />
                                  )}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className={classes.inline}
                                  component="span"
                                  color="textPrimary"
                                >
                                  Minimum Price: {item.minPrice}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className={classes.inline}
                                  component="span"
                                  color="textPrimary"
                                >
                                  Total Team Member: {item.totalTeamMemeber}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  className={classes.inline}
                                  component="span"
                                  color="textPrimary"
                                >
                                  Maximum Price: {item.maxPrice}
                                </Typography>
                                <Typography variant="h6" component="span">
                                  {item.description}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider />
                      </div>
                    ))
                  ) : (
                    <Typography
                      color="textPrimary"
                      variant="h6"
                      component="h3"
                      className={classes.text}
                    >
                      No perposal found, Please Submit perposal
                    </Typography>
                  )
                ) : (
                  <Typography
                    color="textPrimary"
                    variant="h6"
                    component="h3"
                    className={classes.text}
                  >
                    Please Login to see yout perposal
                  </Typography>
                )}
              </List>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Selected perposal
          </TabPanel>
        </SwipeableViews>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {id ? 'Edit Perposal' : 'Create Perposal'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="span">
            {error ? (
              <Alert
                className={classes.alert}
                variant="filled"
                severity="error"
              >
                <AlertTitle>Perposal creatation Error</AlertTitle>
                {error.error}
              </Alert>
            ) : null}
          </DialogContentText>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <TextField
                label="Title"
                variant="outlined"
                value={title}
                className={classes.input}
                name="title"
                onChange={onChange}
              />
              <TextField
                label="Min Price"
                variant="outlined"
                value={minPrice}
                className={classes.input}
                name="minPrice"
                onChange={onChange}
              />
              <TextField
                label="Max Price"
                variant="outlined"
                value={maxPrice}
                className={classes.input}
                name="maxPrice"
                onChange={onChange}
              />
              <TextField
                label="team"
                type="number"
                variant="outlined"
                value={team}
                className={classes.input}
                name="team"
                onChange={onChange}
              />
              <TextareaAutosize
                rowsMax={4}
                name="desc"
                className={classes.input}
                placeholder="Enter description"
                value={desc}
                onChange={onChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={handleClose}
            className={classes.btn}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            className={classes.btn}
            onClick={id ? updatePerposal : createPerposal}
          >
            {id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message="Perposal deleted"
        action={
          <>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackBar}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
  progress: state.progress,
});

const mapActionsToProps = {
  getCustomer,
  getPerposal,
  updatePerposal,
  deletePerposal,
  createPerposal,
  perposalAction,
  getAllProgresss,
};

export default connect(mapStateToProps, mapActionsToProps)(OneCustomer);
