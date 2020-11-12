import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardContent,
  Chip,
  List,
  ListItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
import Customer from '../components/Cutomer';

const useStyle = makeStyles({
  marginTop: {
    marginTop: '6rem',
  },
  team: {
    marginBottom: '1rem',
  },
  card: {
    maxWidth: 345,
    margin: 10,
    width: '18rem',
  },
  text: {
    textAlign: 'center',
  },
});

const CloseProject = () => {
  const [perposals, setPerposal] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [dataLoading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const classes = useStyle();

  const { loading, data } = user;

  useEffect(() => {
    console.log(data.role);
    if (data) {
      if (data.role !== 'user') {
        getPerposal();
      }

      if (data.role === 'user') {
        getCustomer();
      }
    }
  }, [user]);

  const getPerposal = async () => {
    setLoading(true);
    const res = await axios.get(`/api/v1/perposal?user=${data._id}&accept=no`);
    setPerposal(res.data.data);
    console.log(res.data.data);
    setLoading(false);
  };

  const getCustomer = async () => {
    setLoading(true);
    const res = await axios.get(
      `/api/v1/customers?status=false&user=${data._id}`
    );
    console.log(res.data.data);
    setCustomer(res.data.data);
    setLoading(false);
  };

  dayJs.extend(relativeTime);

  return (
    <div className={classes.marginTop}>
      <Container>
        {loading ? (
          <Typography variant="h3">Loading...</Typography>
        ) : data.role === 'user' ? (
          dataLoading ? (
            <Typography variant="h5">Loading...</Typography>
          ) : customer.length === 0 ? (
            <Typography variant="h5">
              No data found, Please Submit the project
            </Typography>
          ) : (
            customer.map((cus) => <Customer item={cus} key={cus._id} />)
          )
        ) : dataLoading ? (
          <Typography>Loading</Typography>
        ) : (
          <Grid container>
            {perposals.length === 0 ? (
              <Typography variant="h5" component="h2">
                Data Not Found
              </Typography>
            ) : (
              perposals.map((per) => (
                <Grid item key={per._id}>
                  <Card className={classes.card}>
                    <CardHeader
                      avatar={
                        <Avatar src={`/uploads/${per.user.image}`}></Avatar>
                      }
                      title={per.title}
                      subheader={dayJs(per.createdAt).fromNow()}
                    />
                    <CardContent>
                      <Typography variant="body1" component="p">
                        TeamMember: {per.totalTeamMemeber}
                      </Typography>
                      <Typography variant="caption">
                        Status: <Chip label={`${per.accept}`} />
                      </Typography>
                      <List>
                        <ListItem>Minimum price: {per.minPrice}</ListItem>
                        <ListItem>Maximum Price: {per.maxPrice}</ListItem>
                      </List>
                      <Typography variant="body1">{per.description}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default CloseProject;
