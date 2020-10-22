import React, { useState, useEffect } from 'react';
import {
  Typography,
  IconButton,
  Card,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  TextField,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { EditAttributes, Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { connect, useSelector } from 'react-redux';
import PaperComponent from '../utils/PaperComponent';
import {
  updateProgress,
  deleteProgress,
} from '../redux/actions/progressAction';

const useStyle = makeStyles({
  grid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    width: '80%',
    margin: 'auto',
  },
  paper: {
    width: '80%',
    margin: 'auto',
    marginBottom: 10,
  },
  taskname: {
    paddingRight: 45,
  },
  completePercentage: {
    paddingRight: 45,
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
});

const ChartItem = (props) => {
  const [open, setOpen] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [snackbar, setSnackbar] = useState(false);
  const [error, setError] = useState(null);

  const progressError = useSelector((state) => state.UI.errors);

  useEffect(() => {
    if (progressError) {
      setError(progressError);
    }
  }, [progressError]);

  const classes = useStyle();
  const { taskname, completePercentage, _id } = props.data;

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setPercentage(completePercentage);
    setOpen(true);
  };

  const handleChange = (e) => {
    if (e.target.name === 'percentage') {
      setPercentage(e.target.value);
    }
  };

  const updateData = () => {
    const data = {
      completePercentage: percentage,
    };
    props.updateProgress(_id, data);
    setOpen(false);
    // setSnackbar(true);
  };

  const deletePro = () => {
    props.deleteProgress(_id);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };

  return (
    <>
      <Card className={classes.paper} elevation={20}>
        <div className={classes.grid}>
          <Typography className={classes.taskname} variant="h5" component="h4">
            {taskname}
          </Typography>
          <Typography variant="h5" component="h4">
            {completePercentage}
          </Typography>
          <div>
            <IconButton onClick={handleClickOpen}>
              <EditAttributes color="action" />
            </IconButton>
            <IconButton onClick={deletePro}>
              <Delete color="error" />
            </IconButton>
          </div>
        </div>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {taskname}
        </DialogTitle>
        <DialogContent>
          <TextField
            type="number"
            label="Progress"
            variant="outlined"
            value={percentage}
            className={classes.input}
            name="percentage"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.btn}>
            Cancel
          </Button>
          <Button className={classes.btn} onClick={updateData}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        {error ? (
          <Alert variant="filled" severity="error">
            {error.error}
          </Alert>
        ) : null}
      </Snackbar>
    </>
  );
};
export default connect(null, { updateProgress, deleteProgress })(ChartItem);
