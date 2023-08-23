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
    setVirtualOpen,
    virtualOpen,
    realOpen,
    setRealOpen
  } = useContext(BotContext);
  return (
    <Stack
      sx={{
        marginX: 'auto',
        width: { xs: '85%', md: '100%', lg: '100%' },
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
              Sair da corretora
            </Button>
            {/* <Stack
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
            </Stack> */}

            <Stack sx={{ width: '100%', borderRadius: 50, marginTop: 2 }}>
              {/* {bots.map((item, index) => (
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
                          ? 'linear-gradient(0.25turn, #0D953C, #1AE363);'
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
              ))} */}

              {/* <Button
                sx={{
                  width: '100%',
                  marginTop: 1,
                  minHeight: 34,
                  borderRadius: 4,
                  fontSize: 14,
                  fontWeight: 'bold',
                  background: 'linear-gradient(0.25turn, #0D953C, #1AE363);',
                }}
                onClick={() => navigate('/robot')}
              >
                Status do Robô
              </Button> */}
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
                background: 'linear-gradient(0.25turn, #0D953C, #1AE363);',
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
