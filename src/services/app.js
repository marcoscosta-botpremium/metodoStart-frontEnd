import { LiveApi } from 'binary-live-api';
import {
  addToken,
  get as getStorage,
  getTokenList,
  removeToken,
  set as setStorage,
} from './storage';

export const appid = '35973';

export const AppConstants = Object.freeze({
  STORAGE_ACTIVE_TOKEN: 'activeToken',
});

export const CRYPTO_CURRENCIES = ['BTC', 'ETH', 'LTC', 'BCH'];

export const isRealAccount = () => {
  const accountList = JSON.parse(getStorage('tokenList') || '{}');
  const activeToken = getStorage(AppConstants.STORAGE_ACTIVE_TOKEN) || [];
  let activeAccount = null;
  let isReal = false;
  try {
    activeAccount = accountList.filter(
      (account) => account.token === activeToken
    );
    isReal = !activeAccount[0].accountName.startsWith('VRT');
  } catch (e) { } // eslint-disable-line no-empty
  return isReal;
};

export const getExtension = () => {
  const host = document.location.hostname;
  const extension = host.split('.').slice(-1)[0];
  return host !== extension ? extension : '';
};

const generateOAuthDomain = () => {
  return 'oauth.binary.com';
};

export const getDefaultEndpoint = () => ({
  url: isRealAccount() ? 'green.binaryws.com' : 'blue.binaryws.com',
  appId: appid,
});

export const getLanguage = () => 'pt-br';
export const getOAuthURL = () =>
  `https://${generateOAuthDomain()}/oauth2/authorize?app_id=${appid}&l=${getLanguage().toUpperCase()}&brand=binary`;

export const getServerAddressFallback = () => getDefaultEndpoint().url;

export const getWebSocketURL = () =>
  `wss://${getServerAddressFallback()}/websockets/v3`;

const options = {
  apiUrl: getWebSocketURL(),
  language: getLanguage().toUpperCase(),
  appId: appid,
  brand: 'binary',
};
export const generateLiveApiInstance = () => new LiveApi(options);

const hasOwnProperty = (obj, prop) =>
  Object.prototype.hasOwnProperty.call(obj, prop);

export const isVirtual = (tokenInfo) =>
  hasOwnProperty(tokenInfo, 'loginInfo') && tokenInfo.loginInfo.is_virtual;

export const parseQueryString = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  const str = window.location.search;
  const objURL = {};
  str.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), (a0, a1, a2, a3) => {
    objURL[a1] = a3;
  });
  return objURL;
};

const queryToObjectArray = (queryStr) => {
  const tokens = [];
  Object.keys(queryStr).forEach((o) => {
    if (!/\d$/.test(o)) return;
    const index = parseInt(o.slice(-1));
    let key = o.slice(0, -1);
    key = key === 'acct' ? 'accountName' : key; // Make it consistent with storageManage naming
    if (index <= tokens.length) {
      tokens[index - 1][key] = queryStr[o];
    } else {
      tokens.push({});
      tokens[index - 1][key] = queryStr[o];
    }
  });
  return tokens;
};

export const oauthLogin = (done = () => 0) => {
  const queryStr = parseQueryString();
  const tokenObjectList = queryToObjectArray(queryStr);
  if (tokenObjectList.length) {
    addTokenIfValid(tokenObjectList[0].token, tokenObjectList).then(() => {
      const accounts = getTokenList();

      if (accounts.length) {
        setStorage(AppConstants.STORAGE_ACTIVE_TOKEN, accounts[0].token);
      }
      document.location = '/robot';
    });
  } else {
    done();
  }
};

export async function addTokenIfValid(token, tokenObjectList) {
  const api = generateLiveApiInstance();
  try {
    const { authorize } = await api.authorize(token);
    const { landing_company_name: lcName } = authorize;
    const {
      landing_company_details: { has_reality_check: hasRealityCheck },
    } = await api.getLandingCompanyDetails(lcName);
    addToken(
      token,
      authorize,
      !!hasRealityCheck,
      ['iom', 'malta'].includes(lcName) && authorize.country === 'gb'
    );

    const { account_list: accountList } = authorize;
    if (accountList.length > 1) {
      tokenObjectList.forEach((tokenObject) => {
        if (tokenObject.token !== token) {
          const account = accountList.filter(
            (o) => o.loginid === tokenObject.accountName
          );
          if (account.length) {
            addToken(tokenObject.token, account[0], false, false);
          }
        }
      });
    }
  } catch (e) {
    removeToken(tokenObjectList[0].token);
    throw e;
  }
  return api.disconnect();
}

export const addBalanceForToken = (token, api) => {
  api.authorize(token).then(() => {
    api.send({ forget_all: 'balance' }).then(() => {
      api.subscribeToBalance();
    });
  });
};
