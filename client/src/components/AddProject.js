import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Button,
  DialogContentText,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import PaperComponent from '../utils/PaperComponent';

import { createCustomer, editCustomer } from '../redux/actions/dataAction';

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
  alert: {
    width: '14.4rem',
    marginBottom: 12,
  },
});

const AddProject = (props) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [size, setSize] = useState(0);
  const [cost, setCost] = useState('');
  const [time, SetTime] = useState('');
  const [address, SetAddress] = useState('');
  const [error, setError] = useState(null);
  const [role, setRole] = useState('plumber');
  const [id, setId] = useState('');
  const history = useHistory();

  const classes = useStyle();
  const err = useSelector((state) => state.UI.errors);
  const { handleCloseAdd, open, setOpen } = props;
  const { loading } = props.data;

  useEffect(() => {
    if (err) {
      setError(err);
      setOpen(true);
    }
    if (props.customer) {
      setName(props.customer.name);
      setPhone(props.customer.phone);
      setCost(props.customer.cost);
      setRole(props.customer.role);
      setSize(props.customer.totalSize);
      SetTime(props.customer.buidTime);
      setDesc(props.customer.description);

      setId(props.customer._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [err, props.data]);

  const roles = [
    {
      value: 'plumber',
      label: 'Plumber',
    },
    {
      value: 'designer',
      label: 'Design',
    },
    {
      value: 'electricain',
      label: 'Electricain',
    },
    {
      value: 'completeHouse',
      label: 'Contracter',
    },
  ];

  const handleChangeAdd = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'desc') {
      setDesc(e.target.value);
    }
    if (e.target.name === 'phone') {
      setPhone(e.target.value);
    }
    if (e.target.name === 'size') {
      setSize(e.target.value);
    }
    if (e.target.name === 'cost') {
      setCost(e.target.value);
    }
    if (e.target.name === 'time') {
      SetTime(e.target.value);
    }
    if (e.target.name === 'address') {
      SetAddress(e.target.value);
    }
    if (e.target.name === 'role') {
      setRole(e.target.value);
    }
  };

  const addData = () => {
    const newData = {
      name: name,
      description: desc,
      phone: phone,
      role: role,
      totalSize: parseInt(size),
      cost: cost,
      buidTime: time,
      address: address,
    };

    props.createCustomer(newData, history);
    setOpen(false);
  };

  const editCustomer = () => {
    const editData = {
      name: name,
      description: desc,
      phone: phone,
      role: role,
      totalSize: parseInt(size),
      cost: cost,
      buidTime: time,
    };
    props.editCustomer(editData, id);
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleCloseAdd}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {id ? 'Edit customer' : 'Add Your Project'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText component="span">
            {error ? (
              <Alert
                className={classes.alert}
                variant="filled"
                severity="error"
              >
                <AlertTitle>Project creatation Error</AlertTitle>
                {error.error}
              </Alert>
            ) : null}
          </DialogContentText>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <>
              <TextField
                label="Name"
                variant="outlined"
                className={classes.input}
                name="name"
                value={name}
                onChange={handleChangeAdd}
              />
              <TextField
                label="Description"
                variant="outlined"
                className={classes.input}
                name="desc"
                value={desc}
                onChange={handleChangeAdd}
              />
              <TextField
                label="Phone"
                type="number"
                value={phone}
                variant="outlined"
                className={classes.input}
                name="phone"
                onChange={handleChangeAdd}
              />
              <TextField
                label="Size Of Place"
                type="number"
                variant="outlined"
                value={size}
                className={classes.input}
                name="size"
                onChange={handleChangeAdd}
              />
              <TextField
                label="Cost"
                type="text"
                variant="outlined"
                className={classes.input}
                value={cost}
                name="cost"
                onChange={handleChangeAdd}
              />
              <TextField
                label="Deliver Time"
                type="text"
                variant="outlined"
                className={classes.input}
                name="time"
                value={time}
                onChange={handleChangeAdd}
              />
              {id ? null : (
                <TextField
                  label="Address"
                  type="text"
                  variant="outlined"
                  className={classes.input}
                  name="address"
                  value={address}
                  onChange={handleChangeAdd}
                />
              )}
              <TextField
                id="standard-select-currency"
                select
                label="Select"
                className={classes.input}
                value={role}
                SelectProps={{
                  native: true,
                }}
                name="role"
                variant="outlined"
                onChange={handleChangeAdd}
                helperText="Please select Role"
              >
                {roles.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={handleCloseAdd}
            className={classes.btn}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            className={classes.btn}
            onClick={id ? editCustomer : addData}
          >
            {id ? 'Edit customer' : 'Add Your Project'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { createCustomer, editCustomer })(
  AddProject
);
