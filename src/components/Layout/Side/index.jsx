import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Drawer, Grid, Stack } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import imgConfig from '../../../assets/config.svg';
import imgLogout from '../../../assets/logout.svg';

import * as moment from 'moment';
import 'moment/locale/pt-br';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Accountbar } from '../../../components';
import { useAuth } from '../../../contexts/auth';
import { BinaryContext } from '../../../contexts/BinaryContext';
import { BotContext } from '../../../contexts/BotContext';
import {
  addBalanceForToken,
  generateLiveApiInstance,
} from '../../../services/app';
import { Img } from '../../../styles/global';
moment.locale('pt-br');

const useStyles = makeStyles({
  paper: {
    background: '#2b2440',
    width: 300,
  },
  paperAccount: {
    background: '#221c33',
    width: 300,
  },
});

const api = generateLiveApiInstance();

const Side = ({ ...rest }) => {
  const { tokenList, setActiveAccount, activeAccount, bots, setBalance, loading, setLoading, visible, setVisible } =
    useContext(BotContext);

  const { profitTable } = useContext(BinaryContext);
  const styles = useStyles();
  const navigate = useNavigate();
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountBarOpen, setAccountbarOpen] = useState(false);

  const { user, setUser } = useAuth();

  useEffect(() => {
    const getUser = localStorage.getItem('getUser');
    setUser(JSON.parse(getUser));
  }, []);

  api.events.on('balance', (response) => {
    const { balance } = response;
    setBalance({ currency: balance.currency, balance: balance.balance });
    setLoading(false);
  });

  api.events.on('website_status', (response) => {
    const { message } = response.website_status;
    if (message) {
      toast.error(message, {
        position: 'bottom left',
        autoHide: false,
        className: 'warn web-status',
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('tokenList', JSON.stringify(tokenList));
    setActiveAccount(tokenList[0]);
    if (!tokenList) {
      setLoading(false);
    }
  }, [tokenList]);

  useEffect(() => {
    if (activeAccount) {
      addBalanceForToken(activeAccount.token, api);
    }
  }, [activeAccount]);

  useEffect(() => { }, [bots]);

  return (
    <Grid {...rest} paddingTop={1}>
      <Grid
        item
        direction="row"
        xs={12}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Stack
          onClick={() => setAccountbarOpen((status) => !status)}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          {user?.user?.picture ? (
            <Avatar
              sx={{ width: 48, height: 48 }}
              alt={user?.user?.nome}
              src={`data:image/png;base64,${user?.user?.picture}`}
            />
          ) : (
            <AccountCircleIcon sx={{ width: 48, height: 48 }} />
          )}
        </Stack>
      </Grid>

      <Grid
        item
        md={2}
        xs={0}
        order={1}
        sx={{ display: { xs: 'none', md: 'block' }, width: '100%', background: 'rgb(47, 45, 55)' }}
      >
        <Accountbar
          key={1}
          user={user}
          visible={visible}
          loading={loading}
          navigate={navigate}
          setVisible={setVisible}
          profitTable={profitTable}
        />

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-around"
        >
          <Img
            src={imgConfig}
            alt="config"
            width={30}
            onClick={() => {
              navigate('/config');
            }}
          />

          <Img
            src={imgLogout}
            alt="Logo"
            width={30}
            onClick={() => {
              navigate('/login');
              localStorage.clear();
            }}
          />
        </Stack>
      </Grid>

      <Drawer
        anchor="right"
        variant="temporary"
        classes={{ paper: styles.paperAccount }}
        open={accountBarOpen}
        onClose={() => setAccountbarOpen(false)}
      >
        <Accountbar
          key={2}
          user={user}
          visible={visible}
          loading={loading}
          navigate={navigate}
          setVisible={setVisible}
          profitTable={profitTable}
          setAccountbarOpen={setAccountbarOpen}
        />

        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-around"
        >
          <Img
            src={imgConfig}
            alt="config"
            width={30}
            onClick={() => {
              navigate('/config');
            }}
          />

          <Img
            src={imgLogout}
            alt="sair"
            width={30}
            onClick={() => {
              localStorage.clear();

              navigate('/login');
            }}
          />
        </Stack>
      </Drawer>
      <div id="blocklyArea" style={{ width: '0', height: '0' }}></div>

      <div id="blocklyDiv" style={{ position: 'absolute' }}></div>
    </Grid>
  );
};

export default Side;
