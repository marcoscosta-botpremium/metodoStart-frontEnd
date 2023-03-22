import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleIcon from 'material-ui-toggle-icon';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { observer as globalObserver } from '../common/utils/observer';
import { Sure } from '../components';
import { BinaryContext } from '../contexts/BinaryContext';
import { BotContext } from '../contexts/BotContext';
import { getOAuthURL, isRealAccount } from '../services/app';
import { setTokenList } from '../services/storage';
import { saveBeforeUnload } from '../utils/binary';
import Switch from './Switch';

moment.locale('pt-br');

export const Accountbar = (props) => {
  const {
    user,
    loading,
    visible,
    navigate,
    setVisible,
    profitTable,
    setAccountbarOpen,
  } = props;

  const { updateTable } = useContext(BinaryContext);
  const {
    bot,
    botRunning,
    botRun,
    setBotRunning,
    blockly,
    tokenList,
    isConnected,
    setConnected,
    setActiveAccount,
    activeAccount,
    selectBot,
    bots,
    balance,
    setTrades,
  } = useContext(BotContext);

  const [virtualOpen, setVirtualOpen] = useState(false);
  const [realOpen, setRealOpen] = useState(false);
  return (
    <Stack
      sx={{
        marginX: 'auto',
        width: { xs: '85%', md: '214px' },
        height: { xs: '88%', md: '80vh' },
      }}
      alignItems="center"
    >
      <Grid item mt={3} sx={{ width: { xs: '80%', md: '100%' } }} order={1}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          {user?.user?.picture ? (
            <Avatar
              sx={{ width: 60, height: 60 }}
              alt={user?.user?.nome}
              src={`data:image/png;base64,${user?.user?.picture}`}
            />
          ) : null}
          <Stack alignItems="start">
            <Typography
              sx={{ fontWeight: 'bold', margin: '0 !important' }}
              variant="subtitle2"
            >
              {user?.user?.nome}
            </Typography>
            <Typography
              sx={{ color: '#777', margin: '0 !important', fontSize: 11 }}
              variant="subtitle2"
            >
              Vencimento da assinatura
            </Typography>
            <Typography
              sx={{ color: '#777', margin: '0 !important', fontSize: 11 }}
              variant="subtitle2"
            >
              {new moment(new Date(user?.subscription?.endDate)).format(
                'DD/MM/YYYY'
              )}
            </Typography>
          </Stack>
        </Stack>
      </Grid>

      <Divider />

      <Grid item sx={{ width: '100%' }} order={2} alignItems="center">
        {loading && isConnected ? (
          <Stack
            alignItems="center"
            textAlign={'center'}
            paddingTop={21}
            paddingX={2}
            justifyContent="center"
          >
            <CircularProgress color="secondary" />
          </Stack>
        ) : isConnected && balance?.currency ? (
          <Stack
            alignItems="center"
            textAlign={'center'}
            justifyContent="center"
          >
            <Stack sx={{ margin: 3, width: '100%' }} direction="row">
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
                    ? 'linear-gradient(0.25turn, #4BD2F1, #1097F3);'
                    : '#2b2440',
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
                    ? 'linear-gradient(0.25turn,  #4BD2F1, #1097F3);'
                    : '#2b2440',
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
                width: '100%',
                paddingY: 1,
                paddingX: 2,
                background: '#2b2440',
              }}
            >
              <Grid container alignItems="row">
                <Grid md={11} xs={11} justifyContent="center">
                  <Typography
                    sx={{
                      textAlign: 'start',
                      fontSize: 21,
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
            <Button
              sx={{ margin: 1 }}
              onClick={() => {
                setActiveAccount(null);
                setTokenList([]);
                localStorage.removeItem('activeToken');
                localStorage.removeItem('tokenList');
                setConnected(false);
              }}
            >
              Sair da binary
            </Button>
            <Stack
              sx={{ marginTop: 2, width: '100%' }}
              alignItems="flex-end"
              direction="row"
            >
              <Typography
                alignSelf="start"
                variant="h6"
                sx={{ fontWeight: 'bold' }}
              >
                Em alta
              </Typography>
              {window.location.pathname == '/robot' &&
              !blockly &&
              !isConnected &&
              !balance?.currency ? (
                <CircularProgress color="secondary" />
              ) : (
                <Switch
                  checked={botRunning}
                  sx={{ marginLeft: 'auto' }}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (Object.keys(bot).length > 0) {
                        botRun();
                        setBotRunning(true);
                        navigate('/robot');
                      } else {
                        toast.error('Selecione um robô', {
                          position: 'bottom right',
                          autoHide: false,
                          className: 'warn web-status',
                        });

                        navigate('/operation');
                      }
                    } else {
                      blockly.stop();
                      setBotRunning(false);
                    }
                    setAccountbarOpen(false);
                  }}
                />
              )}
            </Stack>

            <Stack sx={{ width: '100%', borderRadius: 50, marginTop: 2 }}>
              {bots.map((item, index) => (
                <Button
                  sx={{ width: '100%', marginBottom: 1 }}
                  onClick={() => {
                    selectBot(item);
                  }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      background:
                        bot?.id == item?.id
                          ? 'linear-gradient(0.25turn, #4BD2F1, #1097F3);'
                          : '#2b2440',
                    }}
                  >
                    <Grid container paddingX={1.5} paddingY={0.5}>
                      <Grid alignItems="flex-start">
                        <Typography
                          sx={{ textAlign: 'start', fontWeight: 500 }}
                        >
                          {item?.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Button>
              ))}

              <Button
                sx={{
                  width: '100%',
                  marginTop: 1,
                  minHeight: 34,
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 'bold',
                  background: 'linear-gradient(0.25turn,  #4BD2F1, #1097F3);',
                }}
                onClick={() => navigate('/robot')}
              >
                Status do Robô
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Stack
            alignItems="center"
            textAlign={'center'}
            paddingX={2}
            justifyContent="center"
          >
            <Button
              sx={{
                width: '100%',
                marginTop: 5,
                minHeight: 38,
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 'bold',
                background: 'linear-gradient(0.25turn,  #4BD2F1, #1097F3);',
              }}
              onClick={() => {
                saveBeforeUnload();
                document.location = getOAuthURL();
              }}
            >
              Conectar-se
            </Button>

            <Typography mt={4} variant="subtitle2">
              Você precisa logar na binary para conseguir usar um robô
            </Typography>
          </Stack>
        )}
      </Grid>
    </Stack>
  );
};
