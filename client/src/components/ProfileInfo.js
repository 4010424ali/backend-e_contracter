import React, { useState, useEffect } from 'react';
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
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { EditSharp, AddBoxSharp, PhotoCamera } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useSelector } from 'react-redux';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { updateData, uploadImage } from '../redux/actions/userAction';
import PaperComponent from '../utils/PaperComponent';

import AddProject from './AddProject';

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
  icon: {
    display: 'flex',
  },
});

const ProfileInfo = (props) => {
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [snackError, setSnackbarError] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const classes = useStyle();
  const { loading } = props.user;

  const snackbarError = useSelector((state) => state.UI.errors);
  useEffect(() => {
    if (snackbarError) {
      setOpen(false);
      setSnackbarError(snackbarError);
      setSnackbar(true);
    }
  }, [snackbarError]);

  const handleClickOpen = () => {
    setName(props.user.data.name);
    setEmail(props.user.data.email);
    setOpen(true);
  };

  const handleClickAddOpen = () => {
    setAddOpen(true);
    window.history.pushState('', '', '/add/project/customer');
  };

  const handleClose = () => setOpen(false);

  const handleCloseSnackbar = () => setSnackbar(false);

  const handleCloseAdd = () => {
    window.history.pushState('', '', '/');
    setAddOpen(false);
  };

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

  dayJs.extend(relativeTime);

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (!image.name) {
      return;
    }
    // send image to the server
    const formData = new FormData();
    formData.append('file', image, image.name);

    props.uploadImage(formData);
  };

  const handleEditImage = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
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
                  src={`http://localhost:5000/uploads/${props.user.data.image}`}
                  alt=""
                />
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={handleImageChange}
                />
                <Tooltip title="Edit profile picture">
                  <IconButton
                    className={classes.icon}
                    size="small"
                    onClick={handleEditImage}
                  >
                    <PhotoCamera color="action" />
                  </IconButton>
                </Tooltip>
              </div>
              <div className="profile-component">
                <IconButton onClick={handleClickOpen}>
                  <Tooltip title="Edit email & name">
                    <EditSharp color="action" />
                  </Tooltip>
                </IconButton>
                {props.user.data.role === 'user' && (
                  <IconButton onClick={handleClickAddOpen}>
                    <Tooltip title="Start Project">
                      <AddBoxSharp color="action" />
                    </Tooltip>
                  </IconButton>
                )}
                <Typography className={classes.mb} variant="h3" component="h1">
                  {props.user.data.name}
                </Typography>
                <Divider />
                <Typography variant="caption" component="p">
                  Created At: {dayJs(props.user.data.createdAt).fromNow()}
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
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        {snackError ? (
          <Alert variant="filled" severity="error">
            {snackError.error}
          </Alert>
        ) : null}
      </Snackbar>
      {!snackbarError && addOpen ? (
        <AddProject
          handleCloseAdd={handleCloseAdd}
          open={addOpen}
          setOpen={setAddOpen}
        />
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { updateData, uploadImage })(
  ProfileInfo
);
