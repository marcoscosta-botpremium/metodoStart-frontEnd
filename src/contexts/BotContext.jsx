import { createContext, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { translate } from '../common/i18n';
import { observer as globalObserver } from '../common/utils/observer';
import { checkForRequiredBlocks } from '../contexts/bot';
import { updateConfigCurrencies } from '../pages/common/const';
import { roundBalance } from '../pages/common/tools';
import _Blockly, { load } from '../pages/layout/blockly';
import { symbolPromise } from '../pages/layout/shared';
import * as api from '../services/api';
import { getTokenList } from '../services/storage';

globalObserver.register('Notify', (info) => {
  toast.success(info.message, {
    position: 'bottom left',
    autoHide: false,
    className: 'warn web-status',
  });
});

globalObserver.register('Error', (error) => {
  toast.error(error.message, {
    position: 'bottom right',
    autoHide: false,
    className: 'warn web-status',
  });
});

const isNumber = (num) => num !== '' && Number.isFinite(Number(num));

const getProfit = ({
  sell_price: sellPrice,
  buy_price: buyPrice,
  currency,
}) => {
  if (isNumber(sellPrice) && isNumber(buyPrice)) {
    return roundBalance({
      currency,
      balance: Number(sellPrice) - Number(buyPrice),
    });
  }
  return '';
};

const getTimestamp = (date) => {
  const buyDate = new Date(date * 1000);
  return `${buyDate.toISOString().split('T')[0]} ${buyDate
    .toTimeString()
    .slice(0, 8)} ${buyDate.toTimeString().split(' ')[1]}`;
};

const getTradeObject = (contract) => {
  const tradeObj = {
    ...contract,
    reference: `${contract.transaction_ids.buy}`,
    buy_price: roundBalance({
      balance: contract.buy_price,
      currency: contract.currency,
    }),
    timestamp: getTimestamp(contract.date_start),
  };

  if (contract.entry_tick) {
    tradeObj.entry_tick = contract.entry_spot_display_value;
  }

  if (contract.exit_tick) {
    tradeObj.exit_tick = contract.exit_tick_display_value;
  }

  return tradeObj;
};

export const BotContext = createContext();

const BotProvider = ({ children }) => {
  const [bot, setBot] = useState({});
  const [bots, setBots] = useState([]);
  const [blockly, setBlockly] = useState(undefined);
  const [tokenList, setTokenList] = useState(getTokenList());
  const [isConnected, setConnected] = useState(false);
  const [botRunning, setBotRunning] = useState(false);
  const [activeAccount, setActiveAccount] = useState({});
  const [botStarted, setBotStarted] = useState(false);
  const [xml, setXml] = useState(localStorage.previousStrat);
  const [trades, setTrades] = useState([]);
  const [balance, setBalance] = useState({});
  const [isLoadingXml, setIsloadingXml] = useState(false);
  const [statusBar, setStatusBar] = useState(0);
  const [userInfo, setUser] = useState({});
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [virtualOpen, setVirtualOpen] = useState(false);
  const [realOpen, setRealOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  globalObserver.register('bot.running', (info) => {
    setStatusBar(0);
    setBotRunning(true);
  });

  globalObserver.register('bot.stop', (info) => {
    setBotRunning(false);
    setStatusBar(0);
  });

  useEffect(() => {
    let tokenList = getTokenList();
    setTokenList(tokenList);
    localStorage.setItem('activeToken', tokenList[0]?.token);
    setConnected(tokenList?.length > 0);
    api.getBots().then((data) => {
      const activeUsers = randomIntFromInterval(100, 1000);
      setBots(
        data.scripts
          .sort((a, b) => a.stars > b.stars)
          .map((item, index) => {
            item.users = activeUsers;
            return item;
          })
      );
      if (localStorage.lastBot) {
        const bt = JSON.parse(localStorage.lastBot || '{}');
        setBot(bt);
        api.getXml(bt.id).then((data) => {
          setXml(data);
        });
      }
    });
    globalObserver.register('bot.contract', (contract) => {
      if (!contract) {
        return;
      }
      const tradeObj = getTradeObject(contract);
      const trade = {
        ...tradeObj,
        profit: getProfit(tradeObj),
        contract_status: translate('Pending'),
        contract_settled: false,
      };
      if (trade.is_expired && trade.is_sold && !trade.exit_tick) {
        trade.exit_tick = '-';
      }
      setTrades((trades) => {
        const before =
          trades.filter((item) => item.contract_id == trade.contract_id)
            .length > 0
            ? trades.filter((item) => item.contract_id == trade.contract_id)[0]
            : null;
        let newTrade;
        if (before) {
          delete trade.timestamp;
          newTrade = {
            ...before,
            ...trade,
          };
        } else {
          newTrade = trade;
        }
        return [
          ...trades.filter((item) => item.contract_id != trade.contract_id),
          newTrade,
        ].sort((a, b) => b.contract_id - a.contract_id);
      });
    });
  }, []);

  let loaded = false;

  useEffect(() => {
    if (!blockly && !loaded) {
      loaded = true;
      updateConfigCurrencies().then(() => {
        symbolPromise.then(() => {
          setBlockly(new _Blockly());
        });
      });
    }
  }, [bot]);

  useEffect(() => {
    if (botRunning) {
      api.log(bot?.id);
    }
  }, [botRunning]);
  const botRun = () => {
    // // setTimeout is needed to ensure correct event sequence
    if (!checkForRequiredBlocks()) {
      setTimeout(() => setBotRunning(false));
      return;
    }
    // initRealityCheck(() => setBotRunning(false))

    setTimeout(() => {
      startBot({});
    }, 2000);
  };

  const selectBot = useCallback((bot, exec = false) => {
    new _Blockly().resetWorkspace();

    api
      .getXml(bot?.id)
      .then((xml) => {
        load(xml);
        toast.success('Robô carregado com sucesso');
      })
      .then(() => {
        if (exec) {
          botRun();
          setBotRunning(true);
        }
      });

    setBot(bot);
    localStorage.setItem('lastBot', JSON.stringify(bot));
  }, []);

  const startBot = (limitations) => {
    blockly.run(limitations);
  };

  return (
    <BotContext.Provider
      value={{
        bot: bot,
        setBot: setBot,
        setTokenList: setTokenList,
        tokenList: tokenList,
        isConnected: isConnected,
        startBot: startBot,
        botRunning: botRunning,
        setBotRunning: setBotRunning,
        setActiveAccount: setActiveAccount,
        activeAccount: activeAccount,
        blockly: blockly,
        setBotStarted: setBotStarted,
        botStarted: botStarted,
        selectBot: selectBot,
        botRun: startBot,
        setBots: setBots,
        bots: bots,
        trades: trades,
        setTrades: setTrades,
        balance: balance,
        setBalance: setBalance,
        xml: xml,
        setXml: setXml,
        load: load,
        statusBar: statusBar,
        setStatusBar: setStatusBar,
        setConnected: setConnected,
        setAuthenticated,
        isAuthenticated,
        virtualOpen,
        setVirtualOpen,
        realOpen,
        setRealOpen,
        loading,
        setLoading,
        visible,
        setVisible
      }}
    >
      {children}
    </BotContext.Provider>
  );
};

export default BotProvider;
