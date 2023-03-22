import { getLanguage } from '../../common/lang';

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
export const generateURL = (url) => {
  if (url.split('?').length !== null && url.split('?').length !== undefined) {
    const baseUrl = url.split('?')[0];
    const queryParams = url.split('?')[1];

    console.log(url);
    if (queryParams !== undefined) {
      return `${baseUrl}bot.html?${queryParams}`;
    }
    return `${baseUrl}bot.html`;
  }
  return `${url.replace(/\/+$/, '')}/bot.html`;
};

export const serialize = (obj) => {
  const str = [];
  Object.keys(obj).forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(obj[key])) {
      // eslint-disable-next-line prefer-template
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  });
  return str?.join('&');
};

export const getObjectValue = (obj) => obj[Object.keys(obj)[0]];

export const getUTCTime = (date) => {
  const dateObject = new Date(date);
  return `${`0${dateObject.getUTCHours()}`.slice(
    -2
  )}:${`0${dateObject.getUTCMinutes()}`.slice(
    -2
  )}:${`0${dateObject.getUTCSeconds()}`.slice(-2)}`;
};

export const durationToSecond = (duration) => {
  const parsedDuration = duration.match(/^([0-9]+)([stmhd])$/);
  if (!parsedDuration) {
    return 0;
  }
  const durationValue = parseFloat(parsedDuration[1]);
  const durationType = parsedDuration[2];
  if (durationType === 's') {
    return durationValue;
  }
  if (durationType === 't') {
    return durationValue * 2;
  }
  if (durationType === 'm') {
    return durationValue * 60;
  }
  if (durationType === 'h') {
    return durationValue * 60 * 60;
  }
  if (durationType === 'd') {
    return durationValue * 60 * 60 * 24;
  }
  return 0;
};

export const isProduction = () => true;

export const createUrl = (options) => {
  const getOption = (property) =>
    Object.prototype.hasOwnProperty.call(options, property) &&
    options[property];
  const language = getOption('addLanguage') ? `/${getLanguage()}` : '';
  const path = getOption('path') ? `/${getOption('path')}` : '';
  const htmlExtension = getOption('addHtmlExtension') ? '.html' : '';
  const subdomain = getOption('subdomain')
    ? `${getOption('subdomain')}.`
    : 'www.';
  if (isProduction()) {
    let domainExtension = `.${getExtension()}`;
    if (getOption('isNonBotPage')) {
      switch (document.location.hostname.replace(/^www./, '')) {
        case 'bot.binary.me':
        case 'binary.bot':
          domainExtension = '.me';
          break;
        default:
          domainExtension = '.com';
          break;
      }
    }
    return `${document.location.protocol}//${subdomain}binary${domainExtension}${language}${path}${htmlExtension}`;
  }
  return `https://${subdomain}binary.com${language}${path}${htmlExtension}`;
};

export const getExtension = () => {
  const host = document.location.hostname;
  const extension = host.split('.').slice(-1)[0];
  return host !== extension ? extension : '';
};

export const loadExternalScript = (src, async = true, defer = true) =>
  new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.onerror = reject;

    function handleLoad() {
      const loadState = this.readyState;
      if (loadState && !/loaded|complete/.test(loadState)) return;

      script.onload = null;
      script.onreadystatechange = null;
      resolve();
    }

    script.onload = handleLoad;
    script.onreadystatechange = handleLoad;

    document.head.appendChild(script);
  });

export const errLogger = (err, msg) => {
  const errStr = JSON.stringify(err);
  const errMsg = `${msg} - Error: ${errStr}`;
  console.warn(errMsg);
};
