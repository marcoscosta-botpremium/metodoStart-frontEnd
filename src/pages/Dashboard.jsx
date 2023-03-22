import { Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BinaryChart, ForexSlider } from '../components';
import * as api from '../services/api';
import Layout from './layout/Layout';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userInfo, setUser] = useState({});

  useEffect(() => {
    api.getUser().then((data) => {
      if (data.firstLogin) {
        navigate('/recover?code=' + data.firstLogin);
      }
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data?.user));
    });
  }, [navigate]);

  return (
    <Layout
      title="teste"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={1} />
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h1" sx={{ marginTop: 5, fontWeight: 'bold' }}>
            Mercado
          </Typography>
          <Stack style={{ width: '100%' }}>
            <BinaryChart width={'100%'} height={window.innerHeight * 0.68} />
          </Stack>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default Dashboard;
