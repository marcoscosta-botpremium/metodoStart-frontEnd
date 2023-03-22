import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Rating,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import { useNavigate } from 'react-router-dom';
import { ForexSlider } from '../components';
import { BotContext } from '../contexts/BotContext';
import * as api from '../services/api';
import Layout from './layout/Layout';

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomFloat(min, max, decimals = 2) {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);

  return parseFloat(str);
}

const Strategies = () => {
  const { bot, selectBot, bots, botRun, setBotRunning, setBots, setTrades } =
    useContext(BotContext);
  const navigate = useNavigate();
  const [userInfo, setUser] = useState({});
  const [ticks, setTicks] = useState([]);
  const [pairs, setPairs] = useState({});
  const [value, setValue] = useState({});
  const [profitAcumulated, setProfitAcumulated] = useState({});

  useEffect(() => {
    api.getUser().then((data) => {
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data?.user));
    });
  }, []);

  const botAction = (item) => {
    selectBot(item, true);
    navigate('/bot');
  };

  return (
    <Layout
      title="Mercado"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={4} />
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h5" sx={{ marginTop: 5, fontWeight: 'bold' }}>
            Estratégias
          </Typography>
          <Card
            sx={{
              background: '#2b2440',
              width: '100%',
              minHeight: 600,
              paddingBottom: 1,
            }}
          >
            <Grid container md={12} xs={12}>
              <Grid md={4} xs={12} order={1}>
                <Stack alignItems="center" padding={1}>
                  <Typography
                    alignSelf="flex-start"
                    variant="subtitle"
                    sx={{ marginTop: 1, marginLeft: 1, fontWeight: 'bold' }}
                  >
                    Geral
                  </Typography>
                  <Scrollbars style={{ width: '100%', height: '550px' }}>
                    {bots
                      .sort(function (a, b) {
                        if (a.name < b.name) {
                          return -1;
                        }
                        if (a.name > b.name) {
                          return 1;
                        }
                        return 0;
                      })
                      .map((item, index) => (
                        <Button
                          sx={{ marginTop: 1, width: '95%' }}
                          onClick={() => botAction(item)}
                        >
                          <Card
                            sx={{
                              width: '100%',
                              background:
                                bot.id == item.id
                                  ? 'linear-gradient(0.25turn, #6cdd60, #2196b6);'
                                  : '#221c33',
                            }}
                          >
                            <Stack
                              direction="row"
                              alignItems="flex-start"
                              spacing={2}
                            >
                              <Stack
                                alignItems="flex-start"
                                justifyContent={'center'}
                                padding={1}
                              >
                                <Stack direction="row">
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontSize: 14,
                                      color: 'white',
                                      fontWeight: 'bold',
                                      justifyContent: 'center',
                                    }}
                                    color="primary.muted"
                                  >
                                    {item.name}
                                  </Typography>
                                  {0.9 > 0 ? (
                                    <TrendingUpIcon
                                      sx={{ marginLeft: 1 }}
                                      fontSize="small"
                                      color={'success'}
                                    />
                                  ) : (
                                    <TrendingDownIcon
                                      sx={{ marginLeft: 1 }}
                                      fontSize="small"
                                      color="error"
                                    />
                                  )}
                                </Stack>
                                <Typography
                                  sx={{
                                    marginTop: 1,
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                  }}
                                  variant="subtitle"
                                >
                                  {item?.users}{' '}
                                  <span style={{ fontSize: 10, color: '#999' }}>
                                    usuários agora
                                  </span>
                                </Typography>
                              </Stack>
                              <Stack
                                style={{ flex: 1 }}
                                alignItems="flex-end"
                                justifyContent="center"
                                padding={1}
                              >
                                <Stack direction="row">
                                  <Rating
                                    sx={{
                                      zIndex: 10000,
                                      color: 'white',
                                    }}
                                    value={value[item.id] || item.stars}
                                    onChange={(event, newValue) => {
                                      api
                                        .setRating(item.id, newValue)
                                        .then((data) => {
                                          if (data.success) {
                                            setBots((bots) => [
                                              ...bots.filter(
                                                (data) => item.id != data.id
                                              ),
                                              {
                                                ...bots.filter(
                                                  (data) => item.id == data.id
                                                )[0],
                                                stars: newValue,
                                                rated: true,
                                              },
                                            ]);
                                            setValue((data) => ({
                                              ...data,
                                              [item.id]: newValue,
                                            }));
                                          }
                                        });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </Stack>
                                <Typography
                                  sx={{
                                    marginTop: 1,
                                    fontSize: 11,
                                    fontWeight: 'bold',
                                  }}
                                  variant="subtitle"
                                >
                                  Avaliar
                                </Typography>
                              </Stack>
                            </Stack>
                          </Card>
                        </Button>
                      ))}
                  </Scrollbars>
                </Stack>
              </Grid>
              <Grid md={4} xs={12} order={2}>
                <Stack alignItems="center" padding={1}>
                  <Typography
                    alignSelf="flex-start"
                    variant="subtitle"
                    sx={{ marginTop: 1, marginLeft: 1, fontWeight: 'bold' }}
                  >
                    Meus favoritos
                  </Typography>
                  {bots
                    .filter((item) => item.stars == 5 && item.rated)
                    .slice(0, 5)
                    .map((item, index) => (
                      <Button sx={{ marginTop: 1, width: '95%' }}>
                        <Card
                          sx={{
                            width: '100%',
                            background:
                              bot.id == item.id
                                ? 'linear-gradient(0.25turn, #6cdd60, #2196b6);'
                                : '#221c33',
                          }}
                          onClick={() => botAction(item)}
                        >
                          <Stack
                            direction="row"
                            alignItems="flex-start"
                            spacing={2}
                          >
                            <Stack
                              alignItems="flex-start"
                              justifyContent={'center'}
                              padding={1}
                            >
                              <Stack direction="row">
                                <Typography
                                  variant="caption"
                                  sx={{
                                    fontSize: 14,
                                    color: 'white',
                                    fontWeight: 'bold',
                                    justifyContent: 'center',
                                  }}
                                  color="primary.muted"
                                >
                                  {item.name}
                                </Typography>
                                {/* {(0.9 > 0) ? <TrendingUpIcon sx={{ marginLeft: 1 }} fontSize="small" color={"success"} /> : <TrendingDownIcon sx={{ marginLeft: 1 }} fontSize="small" color="error" />} */}
                              </Stack>
                              {/* <Typography sx={{ marginTop: 1, fontSize: 11, fontWeight: 'bold', }} variant="subtitle">
                            2590 <span style={{ fontSize: 10, color: '#999' }}>usuários agora</span>
                          </Typography> */}
                            </Stack>
                            <Stack
                              style={{ flex: 1 }}
                              alignItems="flex-end"
                              justifyContent="center"
                              padding={1}
                            >
                              <Stack direction="row">
                                <Rating
                                  sx={{
                                    color: 'white',
                                    fontSize: 17,
                                  }}
                                  name="simple-controlled"
                                  value={value[item.id] || item.stars}
                                  onChange={(event, newValue) => {
                                    api
                                      .setRating(item.id, newValue)
                                      .then((data) => {
                                        if (data.success) {
                                          setValue((data) => ({
                                            ...data,
                                            [item.id]: newValue,
                                          }));
                                        }
                                      });
                                  }}
                                />
                              </Stack>
                            </Stack>
                          </Stack>
                        </Card>
                      </Button>
                    ))}
                </Stack>
              </Grid>
              <Grid md={4} xs={12} order={3}>
                <Stack alignItems="center" padding={1}>
                  <Typography
                    alignSelf="flex-start"
                    variant="subtitle"
                    sx={{ marginTop: 1, marginLeft: 1, fontWeight: 'bold' }}
                  >
                    Lucro Total Acumulado
                  </Typography>
                  <Card
                    sx={{ width: '95%', marginTop: 1, background: '#221c33' }}
                  >
                    <Grid container direction="row" paddingX={2.5} marginY={2}>
                      <Grid xs={6} sm={6} md={6} xl={6}>
                        <Typography
                          sx={{
                            textAlign: 'start',
                            fontSize: 15,
                            fontWeight: 500,
                          }}
                        >
                          Nº de operações
                        </Typography>
                      </Grid>
                      <Grid xs={6} sm={6} md={6} xl={6}>
                        <Typography
                          sx={{
                            textAlign: 'end',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}
                        >
                          {Object.keys(profitAcumulated).length ? (
                            profitAcumulated?.operations?.toFixed(0)
                          ) : (
                            <CircularProgress size={17} color="secondary" />
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card
                    sx={{ width: '95%', marginTop: 1, background: '#221c33' }}
                  >
                    <Grid container direction="row" paddingX={2.5} marginY={2}>
                      <Grid item xs={6} sm={6} md={6} xl={6}>
                        <Typography
                          sx={{
                            textAlign: 'start',
                            fontSize: 15,
                            fontWeight: 500,
                          }}
                        >
                          Investimento
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sm={6} md={6} xl={6}>
                        <Typography
                          sx={{
                            textAlign: 'end',
                            fontSize: 15,
                            fontWeight: 'bold',
                          }}
                        >
                          {Object.keys(profitAcumulated).length ? (
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currencyDisplay: 'code',
                              currency: 'USD',
                            })
                              .format(profitAcumulated?.amount?.toFixed(2))
                              .replace('USD', '$')
                          ) : (
                            <CircularProgress size={17} color="secondary" />
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                  <Card
                    sx={{ width: '95%', marginTop: 1, background: '#221c33' }}
                  >
                    <Grid container direction="row" paddingX={2.5} marginY={2}>
                      <Grid xs={6} sm={6} md={6} xl={6}>
                        <Typography
                          sx={{
                            textAlign: 'start',
                            fontSize: 15,
                            fontWeight: 500,
                          }}
                        >
                          Lucro Líquido Distribuído
                        </Typography>
                      </Grid>
                      <Grid xs={6} sm={6} md={6} xl={6}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            textAlign: 'end',
                            fontSize: 15,
                            fontWeight: 'bold',
                            color: 'success.main',
                          }}
                        >
                          {Object.keys(profitAcumulated).length ? (
                            new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currencyDisplay: 'code',
                              currency: 'USD',
                            })
                              .format(profitAcumulated?.profit?.toFixed(2))
                              .replace('USD', '$')
                          ) : (
                            <CircularProgress size={17} color="secondary" />
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Stack>
                {/* <Stack alignItems="center" padding={1}>
                  <Typography alignSelf="flex-start" variant="subtitle" sx={{ marginTop: 1, marginLeft: 1, fontWeight: 'bold' }}>
                    Top Resultados
                  </Typography>
                  <Scrollbars style={{ height: '550px', width:'100%' }}>
                    {bots.map((item, index) => (
                      <Card sx={{ marginTop: 1, width: '95%', background: '#221c33' }}>
                        <Stack direction="row" alignItems="flex-start" spacing={2}>
                          <Stack alignItems="flex-start" justifyContent={'center'} padding={1}>
                            <Stack direction="row">
                              <Typography variant="caption" sx={{ fontSize: 14, color: 'white', fontWeight: 'bold', justifyContent: 'center' }} color="primary.muted">
                                {item.name}
                              </Typography>
                              {(0.9 > 0) ? <TrendingUpIcon sx={{ marginLeft: 1 }} fontSize="small" color={"success"} /> : <TrendingDownIcon sx={{ marginLeft: 1 }} fontSize="small" color="error" />}
                            </Stack>
                            <Typography sx={{ marginTop: 1, fontSize: 11, fontWeight: 'bold', }} variant="subtitle">
                              2590 <span style={{ fontSize: 10, color: '#999' }}>usuários agora</span>
                            </Typography>
                          </Stack>
                          <Stack style={{ flex: 1 }} alignItems="flex-end" justifyContent="center" padding={1}>
                            <Stack direction="row">
                              <Rating
                                sx={{
                                  color:'white'
                                }}
                                name="simple-controlled"
                                value={value[item.id] || item.stars}                             
                                onChange={(event, newValue) => {
                                  api.setRating(item.id, newValue).then(data => {
                                    if(data.success){
                                      setValue(data => ({...data, [item.id]:newValue}))
                                    }
                                  })
                                }}
                              />
                            </Stack>
                          </Stack>
                        </Stack>
                      </Card>
                    ))}
                  </Scrollbars>
                </Stack> */}
              </Grid>
            </Grid>
          </Card>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default Strategies;
