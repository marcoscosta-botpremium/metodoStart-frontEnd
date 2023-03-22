import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import { observer as globalObserver } from '../common/utils/observer';
import { ForexSlider } from '../components';
import Chip from '../components/Chip';
import Switch from '../components/Switch';
import TradeTable from '../components/TradeTable';
import { BinaryContext } from '../contexts/BinaryContext';
import { BotContext } from '../contexts/BotContext';
import * as api from '../services/api';
import Layout from './layout/Layout';

const Bot = () => {
  const {
    bots,
    selectBot,
    bot,
    blockly,
    botRun,
    botRunning,
    setBotRunning,
    isConnected,
    xml,
    setXml,
    load,
    statusBar,
    setStatusBar,
    tokenList,
    trades,
    setTrades,
    balance,
  } = useContext(BotContext);
  const { profitTable } = useContext(BinaryContext);
  const navigate = useNavigate();
  const [userInfo, setUser] = useState({});
  const [summary, setSummary] = useState({});
  const [open, setOpen] = useState(false);

  globalObserver.register('contract.status', (contractStatus) => {
    if (contractStatus.id === 'contract.purchase_sent') {
      setStatusBar(0);
    } else if (contractStatus.id === 'contract.purchase_recieved') {
      setStatusBar(50);
    } else if (contractStatus.id === 'contract.sold') {
      setStatusBar(100);
    }
  });

  useEffect(() => {
    api.getUser().then((data) => {
      if (!data.terms) {
        setOpen(true);
      }
      setUser(data);
      localStorage.setItem('userInfo', JSON.stringify(data?.user));
    });
  }, []);

  useEffect(() => {
    let totalQuantity = 0;
    let onlyProfit = 0;
    let profit = 0;
    let quantity = 0;
    let gains = 0;
    let losses = 0;
    trades.map((item) => {
      if (item.profit) {
        profit += Number(item.profit);
        quantity += Number(item.buy_price);
        totalQuantity += quantity;
        if (item.profit > 0) {
          onlyProfit += Number(item.profit);
          gains += 1;
        } else {
          losses += 1;
        }
      }
    });
    setSummary({
      totalProfit: profit,
      total: trades.length,
      totalWin: gains,
      totalLoss: losses,
      totalQuantity: totalQuantity,
      onlyProfit: onlyProfit,
    });
  }, [trades]);

  return (
    <Layout
      title="Mercado"
      user={userInfo.user}
      subscription={userInfo.subscription}
    >
      <Grid item md={12} xs={12} order={1}>
        <ForexSlider key={0} />
        <Stack alignItems="flex-start" spacing={2}>
          <Typography variant="h5" sx={{ marginTop: 5, fontWeight: 'bold' }}>
            Status do Robô
          </Typography>
          <Stack style={{ width: '100%', marginBottom: 14 }}>
            <Card sx={{ background: '#2b2440' }}>
              <Grid>
                <Stack direction="row">
                  <Grid
                    md={2}
                    p={{
                      xs: bot?.name ? 4 : 2.5,
                      sm: bot?.name ? 4 : 2.5,
                      md: bot?.name ? 3.5 : 2,
                      lg: bot?.name ? 3.5 : 2,
                      xl: bot?.name ? 3.5 : 2,
                    }}
                  >
                    {window.location.pathname == '/bot' && !blockly ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      <Switch
                        checked={botRunning}
                        onChange={(e) => {
                          if (e.target.checked) {
                            if (bot?.name) {
                              botRun();
                              setBotRunning(true);
                            } else {
                              navigate('/strategies');
                              toast.error('Selecione um robô para continuar');
                            }
                          } else {
                            blockly.stop();
                            setBotRunning(false);
                            setStatusBar(0);
                          }
                        }}
                        color="third"
                      />
                    )}
                  </Grid>
                  <Grid item xs={8} md={8}>
                    <Stack
                      alignItems="center"
                      padding={3}
                      sx={{ display: { xs: 'none', sm: 'flex' } }}
                      paddingBottom={7}
                    >
                      <ProgressBar
                        width="90%"
                        height="7px"
                        percent={statusBar}
                        filledBackground="linear-gradient(0.25turn, #6cdd60, #2196b6)"
                      >
                        <Step transition="scale">
                          {({ accomplished }) => (
                            <Stack
                              style={{
                                width: 17,
                                height: 17,
                                borderRadius: 17,
                                background: accomplished ? '#6cdd60' : '#999',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <FiberManualRecordIcon style={{ fontSize: 17 }} />
                              <Typography
                                variant="caption"
                                sx={{
                                  marginTop: 7,
                                  color: '#777',
                                  fontWeight: 'bold',
                                }}
                              >
                                Tentando comprar
                              </Typography>
                            </Stack>
                          )}
                        </Step>
                        <Step transition="scale">
                          {({ accomplished }) => (
                            <Stack
                              style={{
                                width: 17,
                                height: 17,
                                borderRadius: 17,
                                background: accomplished
                                  ? 'linear-gradient(0.25turn, #3DB09A, #3AAD9E)'
                                  : '#999',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <FiberManualRecordIcon style={{ fontSize: 17 }} />
                              <Typography
                                variant="caption"
                                sx={{
                                  marginTop: 7,
                                  color: '#777',
                                  fontWeight: 'bold',
                                }}
                              >
                                Compra realizada
                              </Typography>
                            </Stack>
                          )}
                        </Step>
                        <Step transition="scale">
                          {({ accomplished }) => (
                            <Stack
                              style={{
                                width: 17,
                                height: 17,
                                borderRadius: 17,
                                background: accomplished ? '#2196b6' : '#999',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <FiberManualRecordIcon style={{ fontSize: 17 }} />
                              <Typography
                                variant="caption"
                                sx={{
                                  marginTop: 7,
                                  color: '#777',
                                  fontWeight: 'bold',
                                }}
                              >
                                Operação Concluída
                              </Typography>
                            </Stack>
                          )}
                        </Step>
                      </ProgressBar>
                    </Stack>
                  </Grid>
                  <Grid md={2} p={2}>
                    <Stack alignItems="end">
                      <Stack direction="row">
                        <Button
                          sx={{
                            display: { xs: 'none', sm: 'none', md: 'flex' },
                          }}
                          onClick={() => {
                            globalObserver.emit('summary.clear');
                            setTrades([]);
                          }}
                        >
                          <DeleteSweepIcon />
                        </Button>
                        <Grid style={{ textAlign: 'center' }}>
                          <Typography variant="caption">{bot?.name}</Typography>
                          {botRunning ? (
                            <Chip label="Ligado" variant="gradient" />
                          ) : (
                            <Chip
                              custom="gradient"
                              label="Desligado"
                              variant="filled"
                            />
                          )}
                        </Grid>
                      </Stack>
                    </Stack>
                  </Grid>
                </Stack>
                <Grid
                  container
                  direction="row"
                  justifyContent={'space-evenly'}
                  spacing={2}
                  px={2}
                  py={1}
                  sx={{
                    display: {
                      xl: 'none',
                      lg: 'none',
                      md: 'flex',
                      xs: 'flex',
                      sm: 'flex',
                    },
                  }}
                >
                  <Grid item xs={6} md={6}>
                    <Card xs={12} sx={{ marginTop: 1, background: '#221C33' }}>
                      <Stack px={2} py={1}>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#777',
                          }}
                        >
                          Saldo
                        </Typography>
                        <Typography sx={{ fontSize: 16, fontWeight: 'bold' }}>
                          {!isNaN(balance?.balance) ? (
                            'U$' +
                            String(balance?.balance?.toFixed(2)).replace(
                              '.',
                              ','
                            )
                          ) : (
                            <CircularProgress
                              style={{ width: '12px', height: '12px' }}
                              color="secondary"
                            />
                          )}
                        </Typography>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Card xs={12} sx={{ marginTop: 1, background: '#221C33' }}>
                      <Stack px={2} py={1}>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#777',
                          }}
                        >
                          Resultado Total
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color:
                              Number(summary?.totalProfit) >= 0
                                ? '#1fa69a'
                                : '#c2465b',
                          }}
                        >
                          {Number(summary?.totalProfit) >= 0 ? '+' : '-'} $
                          {Math.abs(summary?.totalProfit || 0).toFixed(2)}
                        </Typography>
                      </Stack>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Card xs={12} sx={{ marginTop: 1, background: '#221C33' }}>
                      <Stack direction="row">
                        <Grid
                          xs={6}
                          md={6}
                          alignItems="center"
                          justifyContent="center"
                          px={2}
                          py={1}
                        >
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#777',
                            }}
                          >
                            Ganho
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#1fa69a',
                            }}
                          >
                            {summary?.totalWin}
                          </Typography>
                        </Grid>
                        <Grid
                          sx={{ marginLeft: 2 }}
                          xs={6}
                          md={6}
                          alignItems="center"
                          justifyContent="center"
                          px={2}
                          py={1}
                        >
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#777',
                            }}
                          >
                            Perda
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#c2465b',
                            }}
                          >
                            {summary?.totalLoss}
                          </Typography>
                        </Grid>
                      </Stack>
                    </Card>
                  </Grid>
                </Grid>
                <Grid xs={12} md={12} spacing={2}>
                  <Stack
                    alignItems="center"
                    padding={3}
                    sx={{ display: { xs: 'flex', md: 'none' } }}
                    paddingBottom={7}
                  >
                    <ProgressBar
                      width="90%"
                      height="7px"
                      percent={statusBar}
                      filledBackground="linear-gradient(0.25turn, #6cdd60, #2196b6)"
                    >
                      <Step transition="scale">
                        {({ accomplished }) => (
                          <Stack
                            style={{
                              width: 17,
                              height: 17,
                              borderRadius: 17,
                              background: accomplished ? '#6cdd60' : '#999',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                marginTop: 7,
                                color: '#777',
                                fontWeight: 'bold',
                              }}
                            >
                              Analisando
                            </Typography>
                          </Stack>
                        )}
                      </Step>
                      <Step transition="scale">
                        {({ accomplished }) => (
                          <Stack
                            style={{
                              width: 17,
                              height: 17,
                              borderRadius: 17,
                              background: accomplished
                                ? 'linear-gradient(0.25turn, #3DB09A, #3AAD9E)'
                                : '#999',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                marginTop: 7,
                                color: '#777',
                                fontWeight: 'bold',
                              }}
                            >
                              Operação realizada
                            </Typography>
                          </Stack>
                        )}
                      </Step>
                      <Step transition="scale">
                        {({ accomplished }) => (
                          <Stack
                            style={{
                              width: 17,
                              height: 17,
                              borderRadius: 17,
                              background: accomplished ? '#2196b6' : '#999',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                marginTop: 7,
                                color: '#777',
                                fontWeight: 'bold',
                              }}
                            >
                              Operação finalizada
                            </Typography>
                          </Stack>
                        )}
                      </Step>
                    </ProgressBar>
                  </Stack>
                </Grid>
              </Grid>
              <Scrollbars style={{ width: '100%', height: '475px' }}>
                <TradeTable />
              </Scrollbars>
              <Grid
                container
                direction="row"
                justifyContent={'space-evenly'}
                spacing={2}
                px={2}
                py={1}
                sx={{
                  display: {
                    xl: 'flex',
                    lg: 'flex',
                    md: 'none',
                    xs: 'none',
                    sm: 'none',
                  },
                }}
              >
                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Card sx={{ background: '#221C33', marginTop: 1 }}>
                    <Stack px={2} py={1}>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}
                      >
                        Conta
                      </Typography>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
                      >
                        {localStorage.bootTrue == 'true' &&
                        userInfo?.user?.email ==
                          'marcos.vinicios_12@hotmail.com'
                          ? 'CR2623624'
                          : tokenList[0]?.accountName}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Card sx={{ marginTop: 1, background: '#221C33' }}>
                    <Stack px={2} py={1}>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}
                      >
                        Nº de operações
                      </Typography>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}
                      >
                        {String(trades.length)}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                {/* <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Card xs={12} sx={{ marginTop:1, background: '#221C33' }}>
                    <Stack px={2} py={1}>
                      <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}>
                        Aposta total
                      </Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                        ${(summary?.totalQuantity) ? summary?.totalQuantity.toFixed(2):Number(0).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid> */}
                {/* <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Card xs={12} sx={{ marginTop:1, background: '#221C33' }}>
                    <Stack px={2} py={1}>
                      <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}>
                        Lucro total
                      </Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
                        ${(summary?.onlyProfit) ? summary?.onlyProfit.toFixed(2):Number(0).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid> */}
                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Card xs={12} sx={{ marginTop: 1, background: '#221C33' }}>
                    <Stack direction="row">
                      <Stack alignItems="center" px={2} py={1}>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#777',
                          }}
                        >
                          Ganho
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#1fa69a',
                          }}
                        >
                          {summary?.totalWin}
                        </Typography>
                      </Stack>
                      <Stack alignItems="center" px={2} py={1}>
                        <Typography
                          sx={{
                            fontSize: 12,
                            fontWeight: 'bold',
                            color: '#777',
                          }}
                        >
                          Perda
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#c2465b',
                          }}
                        >
                          {summary?.totalLoss}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={6} md={4} lg={3} xl={2}>
                  <Card xs={12} sx={{ marginTop: 1, background: '#221C33' }}>
                    <Stack px={2} py={1}>
                      <Typography
                        sx={{ fontSize: 16, fontWeight: 'bold', color: '#777' }}
                      >
                        Resultado Total
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: 16,
                          fontWeight: 'bold',
                          color:
                            Number(summary?.totalProfit) >= 0
                              ? '#1fa69a'
                              : '#c2465b',
                        }}
                      >
                        {Number(summary?.totalProfit) >= 0 ? '+' : '-'} $
                        {Math.abs(summary?.totalProfit || 0).toFixed(2)}
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  width: '100%',
                  alignItems: 'center',
                  textAlign: 'center',
                }}
              >
                <Button
                  sx={{
                    marginTop: 4,
                    marginBottom: 4,
                    paddingX: 2,
                    minHeight: 34,
                    borderRadius: 4,
                    fontSize: 14,
                    fontWeight: 'bold',
                    background: 'linear-gradient(0.25turn, #6cdd60, #2196b6);',
                    display: {
                      xl: 'none',
                      lg: 'none',
                      md: 'inline-flex',
                      xs: 'inline-flex',
                      sm: 'inline-flex',
                    },
                  }}
                  onClick={() => {
                    globalObserver.emit('summary.clear');
                    setTrades([]);
                  }}
                >
                  Limpar operações
                </Button>
              </Grid>
            </Card>
          </Stack>
        </Stack>
      </Grid>
    </Layout>
  );
};

export default Bot;
