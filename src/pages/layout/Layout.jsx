import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import List from '@mui/icons-material/List';
import {
  Avatar,
  Button,
  Container,
  Drawer,
  Grid,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Accountbar, Sidebar } from '../../components';
import { BinaryContext } from '../../contexts/BinaryContext';
import { BotContext } from '../../contexts/BotContext';
import {
  addBalanceForToken,
  generateLiveApiInstance,
} from '../../services/app';
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

const Layout = (props) => {
  const {
    bot,
    setBot,
    botRunning,
    botRun,
    setBotRunning,
    blockly,
    tokenList,
    isConnected,
    setActiveAccount,
    activeAccount,
    selectBot,
    bots,
    balance,
    setBalance,
    setTrades,
  } = useContext(BotContext);
  const { profitTable } = useContext(BinaryContext);
  const styles = useStyles();
  const navigate = useNavigate();
  const { children, title, user, subscription } = props;
  const downMd = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountBarOpen, setAccountbarOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

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
    <Grid direction="row" container height="100%">
      <Grid
        item
        direction="row"
        xs={12}
        paddingTop={5}
        sx={{ display: { xs: 'block', md: 'none' } }}
      >
        <Button
          onClick={() => setSidebarOpen((status) => !status)}
          sx={{ float: 'left', display: { xs: 'block', md: 'none' } }}
        >
          <List sx={{ width: 27, height: 27 }} />
        </Button>
        <Button
          onClick={() => setAccountbarOpen((status) => !status)}
          sx={{ float: 'right', display: { xs: 'block', md: 'none' } }}
        >
          {user?.picture ? (
            <Avatar
              sx={{ width: 37, height: 37 }}
              alt={user?.nome}
              src={`data:image/png;base64,${user?.picture}`}
            />
          ) : (
            <AccountCircleIcon sx={{ width: 37, height: 37 }} />
          )}
        </Button>
      </Grid>
      <Grid container>
        <Grid
          item
          md={2}
          xs={0}
          order={1}
          sx={{
            display: { xs: 'none', md: 'block' },
            background: 'background.primary',
          }}
        >
          <Sidebar key={1} />
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          order={1}
          sx={{ background: 'background.primary' }}
        >
          <Container container height="100%">
            <Typography variant="h5" sx={{ marginTop: 5, fontWeight: 'bold' }}>
              {title}
            </Typography>
            {children}
          </Container>
        </Grid>

        <Grid
          item
          md={2}
          xs={0}
          order={1}
          sx={{ display: { xs: 'none', md: 'block' }, background: '#0d0e0d' }}
        >
          <Accountbar
            key={1}
            user={user}
            subscription={subscription}
            visible={visible}
            loading={loading}
            navigate={navigate}
            setVisible={setVisible}
            profitTable={profitTable}
          />
        </Grid>
      </Grid>

      <Drawer
        variant="temporary"
        classes={{ paper: styles.paper }}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      >
        <Sidebar key={2} />
      </Drawer>
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
          subscription={subscription}
          visible={visible}
          loading={loading}
          navigate={navigate}
          setVisible={setVisible}
          profitTable={profitTable}
          setAccountbarOpen={setAccountbarOpen}
        />
      </Drawer>
      <div id="blocklyArea" style={{ width: '0', height: '0' }}></div>

      <div id="blocklyDiv" style={{ position: 'absolute' }}></div>
    </Grid>
  );
};

export default Layout;
