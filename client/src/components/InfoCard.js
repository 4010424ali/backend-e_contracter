import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Grid,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  root: {
    minWidth: 275,
    margin: '0.5rem',
  },
});

const InfoCard = (props) => {
  const classes = useStyle();
  const {
    user: { name, image },
    createdAt,
    phone,
    nikename,
    education,
    age,
    shortDescription,
    JobRole,
    address,
  } = props.item;

  dayjs.extend(relativeTime);

  return (
    <>
      <Grid sm={12} md={6} lg={4} xl={3} item>
        <Card className={classes.root}>
          <CardHeader
            avatar={<Avatar src={`http://localhost:5000/uploads/${image}`} />}
            title={`@${nikename}`}
            subheader={dayjs(createdAt).fromNow()}
          />
          <CardContent>
            <Typography variant="h5" component="h3">
              Name: {name}
            </Typography>
            <Typography variant="h6" component="h5">
              Jobe Role: {JobRole}
            </Typography>
            <Typography variant="body1" component="p">
              Age: {age}
            </Typography>
            <Typography variant="body1" component="p">
              Phone: {phone}
            </Typography>
            <Typography variant="body1" component="p">
              Address: <strong>{address}</strong>
            </Typography>
            <Typography variant="body1" component="p">
              Education: {education}
            </Typography>
            <Typography variant="body2" component="p">
              Description: {shortDescription}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
};

export default InfoCard;
