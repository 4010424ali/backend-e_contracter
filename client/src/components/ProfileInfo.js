import React, { useState } from 'react';
import {
  Typography,
  Button,
  Tooltip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from '@material-ui/core';
import { EditSharp } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import moment from 'moment';

import { updateData } from '../redux/actions/userAction';
import PaperComponent from '../utils/PaperComponent';

const useStyle = makeStyles({
  mt: {
    marginTop: 12,
  },
  mb: {
    marginBottom: 12,
  },
  email: {
    margin: '0.8rem 0',
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
  input: {
    display: 'block',
    width: '100%',
    marginBottom: 12,
  },
});

const ProfileInfo = (props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyle();
  const { loading } = props.user;

  const handleClickOpen = () => {
    setName(props.user.data.name);
    setEmail(props.user.data.email);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }

    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
  };

  const updateData = () => {
    const newUser = {
      name,
      email,
    };

    props.updateData(newUser);
    handleClose();
    setName('');
    setEmail('');
  };

  return (
    <>
      {loading ? (
        <Typography variant="h1">Loading</Typography>
      ) : props.user ? (
        <div className="conatiner">
          <div className="top-padding">
            <div className="profile">
              <div className="profile-component">
                <img
                  className="image"
                  src={`http://localhost:5000/uploads/${props.user.data.imageUrl}`}
                  alt=""
                />
              </div>
              <div className="profile-component">
                <Button onClick={handleClickOpen}>
                  <Tooltip title="Edit email & name">
                    <EditSharp color="action" />
                  </Tooltip>
                </Button>
                <Typography className={classes.mb} variant="h3" component="h1">
                  {props.user.data.name}
                </Typography>
                <Divider />
                <Typography variant="caption" component="p">
                  Created At:{' '}
                  {moment(props.user.data.createdAt, 'YYYYMMDD')
                    .startOf('hours')
                    .fromNow()}
                </Typography>
                <Divider />
                <Typography
                  className={classes.email}
                  variant="h5"
                  component="p"
                >
                  {props.user.data.email}
                </Typography>
                <Divider />
                <Typography className={classes.mt} variant="body1">
                  Role: {props.user.data.role}
                </Typography>
                <Button className={classes.btn}>Change Password</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Edit Email & Name
        </DialogTitle>
        <DialogContent>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <TextField
                label="Name"
                variant="outlined"
                value={name}
                className={classes.input}
                name="name"
                onChange={handleChange}
              />
              <TextField
                label="Email"
                variant="outlined"
                value={email}
                className={classes.input}
                name="email"
                onChange={handleChange}
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
            onClick={updateData}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateData })(ProfileInfo);
