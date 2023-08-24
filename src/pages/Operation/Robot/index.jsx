import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HistoryIcon from '@mui/icons-material/History';
import React, { useContext, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ProgressBar, Step } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import { observer as globalObserver } from '../../../common/utils/observer';
import Chip from '../../../components/Chip';
import Switch from '../../../components/Switch';
import { getOAuthURL } from '../../../services/app';
import { saveBeforeUnload } from '../../../utils/binary';
import TradeTable from '../../../components/TradeTable';
import { LoadingModal, BotModal, Sure } from '../../../components';
import { BinaryContext } from '../../../contexts/BinaryContext';
import { BotContext } from '../../../contexts/BotContext';
import * as api from '../../../services/api';
import { isRealAccount } from '../../../services/app';
import ToggleIcon from 'material-ui-toggle-icon';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import Layout from '../../../components/Layout';
import { toRem } from '../../../styles/global';
import DoughnutChart from '../../../components/DoughnutChart';
// import Layout from './layout/Layout';
import PuffLoader from 'react-spinners/PuffLoader';
import RingLoader from 'react-spinners/RingLoader';
import robotImg from '../../../assets/robot.png'

const Robot = () => {
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
    setActiveAccount,
    statusBar,
    setStatusBar,
    tokenList,
    trades,
    setTrades,
    balance,
    virtualOpen,
    setVirtualOpen,
    realOpen,
    setTokenList,
    setRealOpen,
    loading,
    setLoading,
    visible,
    setVisible
  } = useContext(BotContext);
  const { profitTable, updateTable } = useContext(BinaryContext);
  const navigate = useNavigate();
  const [userInfo, setUser] = useState({});
  const [summary, setSummary] = useState({});
  const [open, setOpen] = useState(false);
  const [botOpen, setBotOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  globalObserver.register('contract.status', (contractStatus) => {
    if (contractStatus.id === 'contract.purchase_sent') {
      setStatusBar(50);
      console.log('contract.purchase_sent');
    } else if (contractStatus.id === 'contract.purchase_recieved') {
      setStatusBar(100);
      console.log('contract.purchase_recieved');
    } else if (contractStatus.id === 'contract.sold') {
      setStatusBar(0);
      console.log('contract.sold');
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

  return isConnected ? (
    <Layout title="Operações">
      <Grid container spacing={4}>
        <Grid item xs={12} md={6} lg={4}>
          <Card sx={{ background: 'transparent' }}>
            <Card sx={{ background: '#010101', marginTop: 1, paddingBottom: 3, alignItems: 'center', justifyContent: 'center' }}>
              <Typography
                variant="h6"
                pt={3}
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                Controle de Operações
              </Typography>
              <Stack sx={{ padding: 3, width: '100%' }} direction="row">
                <Button
                  onClick={() => {
                    setRealOpen(true);
                  }}
                  sx={{
                    minHeight: 37,
                    background: (
                      localStorage.bootTrue == 'true'
                        ? !isRealAccount()
                        : isRealAccount()
                    )
                      ? 'linear-gradient(0.25turn, #0D953C, #1AE363);'
                      : '#0d0e0d',
                    width: '50%',
                    fontSize: 14,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 70,
                    borderTopLeftRadius: 70,
                  }}
                >
                  Real
                </Button>

                <Button
                  onClick={() => {
                    setVirtualOpen(true);
                  }}
                  sx={{
                    width: '50%',
                    minHeight: 37,
                    background: (
                      localStorage.bootTrue == 'true'
                        ? isRealAccount()
                        : !isRealAccount()
                    )
                      ? 'linear-gradient(0.25turn, #0D953C, #1AE363);'
                      : '#0d0e0d',
                    fontSize: 14,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 70,
                    borderTopRightRadius: 70,
                  }}
                >
                  Virtual
                </Button>
              </Stack>
              <Sure
                open={virtualOpen}
                setOpen={setVirtualOpen}
                onAccept={() => {
                  if (localStorage.bootTrue === 'true') {
                    // eslint-disable-next-line array-callback-return
                    tokenList.map((item, index) => {
                      if (!item.loginInfo.is_virtual) {
                        if (index === 1) {
                          setTokenList(tokenList.reverse());
                        }
                        localStorage.setItem('activeToken', item.token);
                        setActiveAccount(item);
                      }
                    });
                    updateTable();
                    globalObserver.emit('summary.clear');
                    setTrades([]);
                  } else {
                    // eslint-disable-next-line array-callback-return
                    tokenList.map((item, index) => {
                      if (item.loginInfo.is_virtual) {
                        if (index === 1) {
                          setTokenList(tokenList.reverse());
                        }
                        localStorage.setItem('activeToken', item.token);
                        setActiveAccount(item);
                      }
                    });
                    updateTable();
                    globalObserver.emit('summary.clear');
                    setTrades([]);
                  }
                  setVirtualOpen(false);
                }}
              />
              <Sure
                open={realOpen}
                setOpen={setRealOpen}
                onAccept={() => {
                  if (localStorage.bootTrue == 'true') {
                    tokenList.map((item, index) => {
                      if (item.loginInfo.is_virtual) {
                        if (index == 1) {
                          setTokenList(tokenList.reverse());
                        }
                        localStorage.setItem('activeToken', item.token);
                        setActiveAccount(item);
                      }
                    });
                    updateTable();
                    globalObserver.emit('summary.clear');
                    setTrades([]);
                  } else {
                    tokenList.map((item, index) => {
                      if (!item.loginInfo.is_virtual) {
                        if (index == 1) {
                          setTokenList(tokenList.reverse());
                        }
                        localStorage.setItem('activeToken', item.token);
                        setActiveAccount(item);
                      }
                    });
                    updateTable();
                    globalObserver.emit('summary.clear');
                    setTrades([]);
                  }
                  setRealOpen(false);
                }}
              />
              <Card
                sx={{
                  marginTop: 1,
                  paddingY: 1,
                  paddingX: 2,
                  marginLeft: 3,
                  marginRight: 3,
                  background: '#0d0e0d',
                }}
              >
                <Grid container alignItems="row">
                  <Grid item md={12} lg={12} sm={12}>
                    <Typography style={{ fontSize: 13, color: '#8A8A8A', width: '100%' }}>
                      Saldo
                    </Typography>
                  </Grid>
                  <Grid md={11} xs={11} justifyContent="center">

                    <Typography
                      sx={{
                        textAlign: 'start',
                        fontSize: 17,
                        fontWeight: 'bold',
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={21} color="secondary" />
                      ) : visible ? (
                        `${String(balance.balance?.toFixed(2)).replace(
                          '.',
                          ','
                        )} ${balance.currency}`
                      ) : (
                        '******'
                      )}
                    </Typography>
                  </Grid>
                  <Grid md={1} xs={1} justifyContent="center">
                    <ToggleIcon
                      style={{ height: '100%' }}
                      onClick={() => setVisible((visible) => !visible)}
                      on={visible}
                      onIcon={<Visibility />}
                      offIcon={<VisibilityOff />}
                    />
                  </Grid>
                </Grid>
              </Card>
              <Card xs={12} px={2}
                py={1}
                sx={{
                  marginTop: 1,
                  paddingY: 1,
                  paddingX: 2,
                  marginLeft: 3,
                  marginRight: 3,
                  background: '#0d0e0d',
                }}>
                <Stack>
                  <Typography style={{ fontSize: 13, color: '#8A8A8A', width: '100%' }}>
                    Resultado Total
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 17,
                      fontWeight: 'bold',
                      color:
                        Number(summary?.totalProfit) >= 0
                          ? '#14BF44'
                          : '#c2465b',
                    }}
                  >
                    {Number(summary?.totalProfit) >= 0 ? '+' : '-'} $
                    {Math.abs(summary?.totalProfit || 0).toFixed(2)}
                  </Typography>
                </Stack>
              </Card>
              <Grid container>
                <Grid item xs={6} md={6} lg={6}>
                  {(!!bot) ?
                    <Card px={2}
                      py={1}
                      sx={{
                        marginTop: 1,
                        paddingY: 1,
                        paddingX: 2,
                        marginLeft: 3,
                        marginRight: 3,
                        background: '#0d0e0d',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 14
                      }}
                      onClick={() => setBotOpen(true)}>
                      <img src={robotImg} style={{ width: 50, height: 50 }} /><br />
                      {bot?.name ? bot?.name : 'Escolha uma estratégia'}
                    </Card>
                    : <Card px={2}
                      py={1}
                      sx={{
                        marginTop: 1,
                        paddingY: 1,
                        paddingX: 2,
                        marginLeft: 3,
                        marginRight: 3,
                        background: '#0d0e0d',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        color: 'white',
                        fontSize: 14
                      }}
                      onClick={() => setBotOpen(true)}>
                      <img src={robotImg} style={{ width: 50, height: 50 }} /><br />
                      Escolha um robô
                    </Card>}
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Card px={2}
                    py={1}
                    sx={{
                      marginTop: 1,
                      paddingY: 1,
                      paddingX: 2,
                      marginLeft: 3,
                      marginRight: 3,
                      background: !historyOpen ? '#0d0e0d' : 'linear-gradient(0.25turn, #0D953C, #1AE363);'
                    }}
                    onClick={() => {
                      setHistoryOpen(status => !status)

                      // scroll to bottom
                      const element = document.getElementById('tradetable-history');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <HistoryIcon />
                      <Typography style={{ marginLeft: 7, fontSize: 13, color: 'white', fontWeight: 'bold' }}>
                        Histórico
                      </Typography>
                    </div>
                  </Card>
                  <Card px={2}
                    py={1}
                    sx={{
                      marginTop: 1,
                      paddingY: 1,
                      paddingX: 2,
                      marginLeft: 3,
                      marginRight: 3,
                      background: botRunning ? '#0d0e0d' : 'linear-gradient(0.25turn, #0D953C, #1AE363);'
                    }}
                    onClick={() => {
                      if (!botRunning) {
                        if (bot?.name) {
                          botRun();
                          setBotRunning(true);
                          setStatusBar(0);
                        } else {
                          navigate('/strategies');
                          toast.error('Selecione uma estratégia para continuar');
                        }
                      } else {
                        blockly.stop();
                        setBotRunning(false);
                        setStatusBar(0);
                      }
                    }}>
                    {(!botRunning) ? (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <PlayCircleIcon />
                        <Typography style={{ marginLeft: 7, fontSize: 13, fontWeight: 'bold', color: 'white' }}>
                          Iniciar
                        </Typography>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <StopCircleIcon
                          style={{ fill: '#FD3531' }}
                        />
                        <Typography style={{ color: '#FD3531', marginLeft: 7, fontSize: 13, fontWeight: 'bold' }}>
                          Parar
                        </Typography>
                      </div>
                    )}
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Card>
        </Grid>
        <Grid display={{ xs: 'block', md: 'none', lg: 'none', xl: 'none' }} margin={0} item xs={12} md={12} lg={6}>
          {botRunning ? <Card sx={{
            paddingTop: 2,
            paddingBottom: 2,
            display: 'flex',
            background: '#010101',
            justifyContent: 'center', // Horizontally center the content
            alignItems: 'center',
          }}>
            <Grid container style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                {statusBar == 0 ? <RingLoader size={40} color={"#36d7b7"} /> : null}
                {statusBar == 50 ? <PuffLoader size={40} color={"#14BF44"} /> : null}
                {statusBar == 100 ? <CheckCircleOutlineIcon size={40} style={{ width: 40, height: 40, fill: '#14BF44' }} /> : null}
              </Grid>
              <Grid item lg={12} style={{ marginLeft: 10, paddingTop: 7, textAlign: 'center' }}>
                {statusBar == 0 ?
                  <Typography sx={{ width: '100%', fontSize: 14, fontWeight: 'bold', color: '#8A8A8A' }}>
                    Analisando Mercado
                  </Typography> : null}

                {statusBar == 50 ?
                  <Typography sx={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: '#8A8A8A' }}>
                    Entrada executada
                  </Typography> : null}

                {statusBar == 100 ?
                  <Typography sx={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: '#8A8A8A' }}>
                    Entrada concluída
                  </Typography> : null}
              </Grid>
            </Grid>
          </Card> : null}
        </Grid>
        <Grid item xs={6} md={6} lg={5}>
          <Grid item xs={12} md={12} lg={12}>
            <Card sx={{
              display: 'flex',
              background: 'transparent',
              justifyContent: 'center', // Horizontally center the content
              alignItems: 'center'
            }}>
              <DoughnutChart
                style={{
                  width: '80%',
                  height: '80%',
                  maxWidth: '310px',
                  maxHeight: '310px'
                }}
                data={(!!summary?.totalWin && !!summary?.totalLoss) ? [summary?.totalWin, summary?.totalLoss] : [1, 1]} />
            </Card>
          </Grid>
          <Grid style={{ marginLeft: 'auto', marginRight: 'auto' }} display={{ xs: 'none', md: 'block', lg: 'block' }} item xs={12} md={12} lg={6}>
            {botRunning ? <Card sx={{
              marginTop: 2,
              paddingTop: 2,
              paddingBottom: 2,
              display: 'flex',
              background: '#010101',
              justifyContent: 'center', // Horizontally center the content
              alignItems: 'center',
            }}>
              <Grid container>
                <Grid item lg={12} style={{ display: 'flex', justifyContent: 'center' }}>
                  {statusBar == 0 ? <RingLoader size={40} color={"#36d7b7"} /> : null}
                  {statusBar == 50 ? <PuffLoader size={40} color={"#14BF44"} /> : null}
                  {statusBar == 100 ? <PuffLoader size={40} color={"#14BF44"} /> : null}
                </Grid>
                <Grid item lg={12} style={{ paddingTop: 7, textAlign: 'center' }}>
                  {statusBar == 0 ?
                    <Typography sx={{ width: '100%', fontSize: 14, fontWeight: 'bold', color: '#8A8A8A' }}>
                      Analisando Mercado
                    </Typography> : null}

                  {statusBar == 50 ?
                    <Typography sx={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: '#8A8A8A' }}>
                      Entrada executada
                    </Typography> : null}

                  {statusBar == 100 ?
                    <Typography sx={{ width: '100%', fontSize: 15, fontWeight: 'bold', color: '#8A8A8A' }}>
                      Entrada concluída
                    </Typography> : null}
                </Grid>
              </Grid>
            </Card> : null}
          </Grid>
        </Grid>
        <Grid item xs={6} md={6} lg={3}>
          <Card xs={12} sx={{ marginTop: 1, background: '#010101' }}>
            <Stack direction="row" justifyContent="space-around">
              <Stack alignItems="center" px={2} py={1}>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: '#8A8A8A',
                  }}
                >
                  Ganho
                </Typography>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#14BF44',
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
                    color: '#8A8A8A',
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
          <Card sx={{ background: '#010101', marginTop: 1 }}>
            <Stack px={2} py={1}>
              <Typography
                sx={{ fontSize: 16, fontWeight: 'bold', color: '#8A8A8A' }}
              >
                Conta
              </Typography>
              <Typography
                sx={{ fontSize: 14, fontWeight: 'bold', color: '#FEFEFE' }}
              >
                {localStorage.bootTrue === 'true' &&
                  userInfo?.user?.email === 'marcos.vinicios_12@hotmail.com'
                  ? tokenList[1]?.accountName
                  : tokenList[0]?.accountName}
              </Typography>
            </Stack>
          </Card>
          <Button
            sx={{
              width: '100%',
              marginTop: 2,
              paddingX: 2,
              minHeight: 34,
              borderRadius: 2,
              fontSize: 14,
              fontWeight: 'bold',
              background: 'linear-gradient(0.25turn, #0D953C, #1AE363);',
              display: {
                xl: 'inline-flex',
                lg: 'inline-flex',
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
      </Grid >
      <Stack>
        <Card sx={{ background: 'transparent' }}>
          <Grid>
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
            </Grid>
          </Grid>

          <Scrollbars id="tradetable-history" style={{ display: historyOpen ? 'block' : 'none', width: '100%', height: toRem(320) }}>
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
                background: 'linear-gradient(0.25turn, #0D953C, #1AE363);',
                display: {
                  xl: 'none',
                  lg: 'none',
                  md: 'none',
                  xs: 'none',
                  sm: 'none',
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
      <BotModal setOpen={setBotOpen} open={botOpen || !bot} />
      <LoadingModal open={!balance.balance && !botRunning && !!bot && !isConnected} />
    </Layout >
  ) : (
    <Layout title="Operações">
      {/* Clique para se conectar */}
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ height: '50vh' }}
      >
        <Grid item xs={12} md={8} lg={3}>
          <Button
            sx={{
              width: '100%',
              marginTop: 5,
              minHeight: 38,
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 'bold',
              background: 'linear-gradient(0.25turn, #0D953C, #1AE363);',
            }}
            onClick={() => {
              saveBeforeUnload();
              document.location = getOAuthURL();
            }}
          >
            Conectar-se
          </Button>

          <Typography
            mt={1}
            variant="subtitle2"
            sx={{
              textAlign: 'center',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
            onClick={() => {
              navigate('/tutorials/2/');
            }}>
            Caso não tenha conta na corretora clique aqui
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  )
};

export default Robot;
