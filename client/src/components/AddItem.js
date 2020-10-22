import React, { useState } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { createProgress } from '../redux/actions/progressAction';

const useStyle = makeStyles({
  btn: {
    backgroundColor: '#5cdb95',
    color: '#fff',
    marginTop: 12,
    marginRight: 15,
    '&:hover': {
      backgroundColor: '#fff',
      color: '#333',
      border: '#5cdb95 2px solid',
      boxShadow: 'none',
      borderRadius: '5px',
    },
  },
  text: {
    marginTop: 15,
  },
});

const AddItem = (props) => {
  const [add, setAdd] = useState('');
  const classes = useStyle();

  const onChange = (e) => {
    if (e.target.name === 'add') {
      setAdd(e.target.value);
    }
  };

  const submitItem = () => {
    const data = {
      taskname: add,
    };
    props.createProgress(props.id, data);
    setAdd('');
  };

  return (
    <>
      <Typography variant="h4" component="h3">
        Check the Progress
      </Typography>
      <TextField
        className={classes.text}
        label="Add grapg Item"
        variant="outlined"
        name="add"
        value={add}
        type="text"
        onChange={onChange}
      />
      <Button onClick={submitItem} className={classes.btn}>
        Add Item
      </Button>
    </>
  );
};

export default connect(null, { createProgress })(AddItem);
