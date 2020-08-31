import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {
  Card,
  Grid,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';

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

const Customer = ({ item }) => {
  const classes = useStyles();

  const {
    name,
    status,
    createdAt,
    role,
    location: { formattedAddress },
    cost,
    _id,
  } = item;

  return (
    <>
      <Grid sm={12} md={6} lg={4} xl={3} item>
        <Card className={classes.root}>
          <CardContent component="div">
            {status === true ? (
              <Chip
                className={classes.activeChip}
                size="medium"
                label="Active"
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
              {moment(createdAt, 'YYYYMMDD').startOf('hours').fromNow()}
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
            <Button size="small">View Profile</Button>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};

export default Customer;
