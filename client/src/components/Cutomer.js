import React from 'react';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Chip,
  Paper,
  Tooltip,
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import { connect } from 'react-redux';

import { deleteCustomer } from '../redux/actions/dataAction';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: '0.5rem',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  activeChip: {
    background: green[400],
    color: '#fff',
  },
  closeChip: {
    background: red[900],
    color: '#fff',
  },
  paper: {
    margin: '0.5rem 0',
    padding: '1rem',
  },
  link: {
    color: green[200],
  },
});

const Customer = (props) => {
  const classes = useStyles();

  const {
    name,
    status,
    createdAt,
    role,
    location: { formattedAddress },
    cost,
    _id,
    user,
  } = props.item;
  console.log(status);

  dayJs.extend(relativeTime);

  const handleDelete = () => {
    props.deleteCustomer(_id);
  };

  return (
    <>
      <Grid sm={12} md={6} lg={4} xl={3} item>
        <Card className={classes.root}>
          <CardContent component="div">
            {status ? (
              <Chip
                className={classes.activeChip}
                size="medium"
                label="active"
              />
            ) : (
              <Chip className={classes.closeChip} size="medium" label="close" />
            )}
            <Paper component="div" className={classes.paper} elevation={3}>
              <Link className={classes.link} to={`/customer/${_id}`}>
                {' '}
                <Typography variant="h5">{name}</Typography>{' '}
              </Link>
            </Paper>
            <Typography className={classes.pos} color="textSecondary">
              {dayJs(createdAt).fromNow()}
            </Typography>
            <Typography variant="body2" component="div">
              {role}
              <br />
              Address: <strong>{formattedAddress}</strong>
            </Typography>
            <Typography variant="body2" component="div">
              Cost: <strong>{cost}</strong>
            </Typography>
          </CardContent>
          <CardActions>
            {props.user.authenticated && props.user.data._id === user ? (
              <IconButton size="small" onClick={handleDelete}>
                <Tooltip title="delete">
                  <Delete color="error" />
                </Tooltip>
              </IconButton>
            ) : null}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { deleteCustomer })(Customer);
