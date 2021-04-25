// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const { URL } = require('url');
const miniget = require('miniget');
const querystring = require('querystring');
const axios = require('axios');

// eslint-disable-next-line max-len
const getRequestBody = (videoId) => ({ 'videoId': videoId, 'context': { 'client': { 'hl': 'en', 'gl': 'FR', 'remoteHost': '194.5.53.155', 'deviceMake': 'Apple', 'deviceModel': '', 'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36,gzip(gfe)', 'clientName': 'WEB_EMBEDDED_PLAYER', 'clientVersion': '1.20210201.1.1', 'timeZone': 'Europe/Paris', 'clientScreen': 'EMBED', 'playerType': 'UNIPLAYER', 'tvAppInfo': { 'livingRoomAppMode': 'LIVING_ROOM_APP_MODE_UNSPECIFIED' } }, 'user': { 'lockedSafetyMode': false }, 'request': { 'useSsl': true, 'internalExperimentFlags': [], 'consistencyTokenJars': [] }, 'clickTracking': { 'clickTrackingParams': 'IhMIgYXY3NTc7gIV2RQGAB0EjAd0' }, 'adSignalsInfo': { 'params': [{ 'key': 'dt', 'value': '1612868862212' }, { 'key': 'flash', 'value': '0' }, { 'key': 'frm', 'value': '2' }, { 'key': 'u_tz', 'value': '60' }, { 'key': 'u_his', 'value': '3' }, { 'key': 'u_java', 'value': 'false' }, { 'key': 'u_h', 'value': '1120' }, { 'key': 'u_w', 'value': '1792' }, { 'key': 'u_ah', 'value': '1095' }, { 'key': 'u_aw', 'value': '1741' }, { 'key': 'u_cd', 'value': '30' }, { 'key': 'u_nplug', 'value': '3' }, { 'key': 'u_nmime', 'value': '4' }, { 'key': 'bc', 'value': '31' }, { 'key': 'bih', 'value': '-12245933' }, { 'key': 'biw', 'value': '-12245933' }, { 'key': 'brdim', 'value': '0,25,0,25,1741,25,1739,1095,640,390' }, { 'key': 'vis', 'value': '1' }, { 'key': 'wgl', 'value': 'true' }, { 'key': 'ca_type', 'value': 'image' }] }, 'thirdParty': { 'embedUrl': 'http://127.0.0.1:5500/' } }, 'playbackContext': { 'contentPlaybackContext': { 'html5Preference': 'HTML5_PREF_WANTS', 'lactMilliseconds': '8', 'referer': 'https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=https://netlify.app/', 'signatureTimestamp': 18662, 'autoCaptionsDefaultOn': false, 'liveContext': { 'startWalltime': '0' }, 'playerWidthPixels': 640, 'playerHeightPixels': 390 } }, 'cpn': 'cOxx9mA1FMJLVlVX' });
const requestUrl = 'https://www.youtube.com/youtubei/v1/player?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8';
const requestHeaders = {
  'authority': 'www.youtube.com',
  'sec-ch-ua': '"Chromium";v="88", "Google Chrome";v="88", ";Not A Brand";v="99"',
  'dnt': '1',
  'sec-ch-ua-mobile': '?0',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36',
  'content-type': 'application/json',
  'accept': '*/*',
  'origin': 'https://www.youtube.com',
  'sec-fetch-dest': 'empty',
  'referer': 'https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=https://netlify.app/',
  'accept-language': 'en-US,en;q=0.9',
  'Cookie': 'VISITOR_INFO1_LIVE=paeiS0ZsdV8; PREF=volume=100&f6=80&tz=Europe.Paris&library_tab_browse_id=FEmusic_liked_playlists&al=en&f4=4000000; YSC=GwnkeMPkzMI; CONSENT=PENDING+452; GPS=1',
};



const getTokens = async (html5playerfile, options) => {
  const body = await miniget(html5playerfile, options.requestOptions).text();
  const tokens = extractActions(body);
  if (!tokens || !tokens.length) {
    throw Error('Could not extract signature deciphering actions');
  }
  return tokens;
};


const decipher = (tokens, sig) => {
  sig = sig.split('');
  for (let i = 0, len = tokens.length; i < len; i++) {
    const token = tokens[i]; let pos;
    switch (token[0]) {
      case 'r':
        sig = sig.reverse();
        break;
      case 'w':
        pos = ~~token.slice(1);
        sig = swapHeadAndPosition(sig, pos);
        break;
      case 's':
        pos = ~~token.slice(1);
        sig = sig.slice(pos);
        break;
      case 'p':
        pos = ~~token.slice(1);
        sig.splice(0, pos);
        break;
    }
  }
  return sig.join('');
};

const swapHeadAndPosition = (arr, position) => {
  const first = arr[0];
  arr[0] = arr[position % arr.length];
  arr[position] = first;
  return arr;
};


const jsVarStr = '[a-zA-Z_\\$][a-zA-Z_0-9]*';
const jsSingleQuoteStr = `'[^'\\\\]*(:?\\\\[\\s\\S][^'\\\\]*)*'`;
const jsDoubleQuoteStr = `"[^"\\\\]*(:?\\\\[\\s\\S][^"\\\\]*)*"`;
const jsQuoteStr = `(?:${jsSingleQuoteStr}|${jsDoubleQuoteStr})`;
const jsKeyStr = `(?:${jsVarStr}|${jsQuoteStr})`;
const jsPropStr = `(?:\\.${jsVarStr}|\\[${jsQuoteStr}\\])`;
const jsEmptyStr = `(?:''|"")`;
const reverseStr = ':function\\(a\\)\\{' +
  '(?:return )?a\\.reverse\\(\\)' +
  '\\}';
const sliceStr = ':function\\(a,b\\)\\{' +
  'return a\\.slice\\(b\\)' +
  '\\}';
const spliceStr = ':function\\(a,b\\)\\{' +
  'a\\.splice\\(0,b\\)' +
  '\\}';
const swapStr = ':function\\(a,b\\)\\{' +
  'var c=a\\[0\\];a\\[0\\]=a\\[b(?:%a\\.length)?\\];a\\[b(?:%a\\.length)?\\]=c(?:;return a)?' +
  '\\}';
const actionsObjRegexp = new RegExp(
  `var (${jsVarStr})=\\{((?:(?:${jsKeyStr}${reverseStr}|${jsKeyStr}${sliceStr}|${jsKeyStr}${spliceStr}|${jsKeyStr}${swapStr
  }),?\\r?\\n?)+)\\};`);
const actionsFuncRegexp = new RegExp(`${`function(?: ${jsVarStr})?\\(a\\)\\{` +
  `a=a\\.split\\(${jsEmptyStr}\\);\\s*` +
  `((?:(?:a=)?${jsVarStr}`}${jsPropStr
  }\\(a,\\d+\\);)+)` +
  `return a\\.join\\(${jsEmptyStr}\\)` +
  `\\}`);
const reverseRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${reverseStr}`, 'm');
const sliceRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${sliceStr}`, 'm');
const spliceRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${spliceStr}`, 'm');
const swapRegexp = new RegExp(`(?:^|,)(${jsKeyStr})${swapStr}`, 'm');

const extractActions = (body) => {
  const objResult = actionsObjRegexp.exec(body);
  const funcResult = actionsFuncRegexp.exec(body);
  if (!objResult || !funcResult) {
    return null;
  }

  const obj = objResult[1].replace(/\$/g, '\\$');
  const objBody = objResult[2].replace(/\$/g, '\\$');
  const funcBody = funcResult[1].replace(/\$/g, '\\$');

  let result = reverseRegexp.exec(objBody);
  const reverseKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');
  result = sliceRegexp.exec(objBody);
  const sliceKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');
  result = spliceRegexp.exec(objBody);
  const spliceKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');
  result = swapRegexp.exec(objBody);
  const swapKey = result && result[1]
    .replace(/\$/g, '\\$')
    .replace(/\$|^'|^"|'$|"$/g, '');

  const keys = `(${[reverseKey, sliceKey, spliceKey, swapKey].join('|')})`;
  const myreg = `(?:a=)?${obj
    }(?:\\.${keys}|\\['${keys}'\\]|\\["${keys}"\\])` +
    `\\(a,(\\d+)\\)`;
  const tokenizeRegexp = new RegExp(myreg, 'g');
  const tokens = [];
  while ((result = tokenizeRegexp.exec(funcBody)) !== null) {
    const key = result[1] || result[2] || result[3];
    switch (key) {
      case swapKey:
        tokens.push(`w${result[4]}`);
        break;
      case reverseKey:
        tokens.push('r');
        break;
      case sliceKey:
        tokens.push(`s${result[4]}`);
        break;
      case spliceKey:
        tokens.push(`p${result[4]}`);
        break;
    }
  }
  return tokens;
};



const setDownloadURL = (format, sig) => {
  let decodedUrl;
  if (format.url) {
    decodedUrl = format.url;
  } else {
    return;
  }
  try {
    decodedUrl = decodeURIComponent(decodedUrl);
  } catch (err) {
    return;
  }
  const parsedUrl = new URL(decodedUrl);
  parsedUrl.searchParams.set('ratebypass', 'yes');

  if (sig) {
    parsedUrl.searchParams.set(format.sp || 'signature', sig);
  }
  format.url = parsedUrl.toString();
};


/**
 * Applies `sig.decipher()` to all format URL's.
 *
 // eslint-disable-next-line valid-jsdoc
 * @param {Array.<Object>} formats
 * @param {string} html5player
 * @param {Object} options
 */
const decipherFormats = async (format, html5player, options) => {
  const decipheredFormats = {};
  const tokens = await getTokens(html5player, options);

  const cipher = format.signatureCipher || format.cipher;
  if (cipher) {
    Object.assign(format, querystring.parse(cipher));
    delete format.signatureCipher;
    delete format.cipher;
  }
  const sig = tokens && format.s ? decipher(tokens, format.s) : null;
  setDownloadURL(format, sig);
  decipheredFormats[format.url] = format;

  return format;
};

const getHTML5player = (body) => {
  const html5playerRes =
    /<script\s+src="([^"]+)"(?:\s+type="text\/javascript")?\s+name="player_ias\/base"\s*>|"jsUrl":"([^"]+)"/
      .exec(body);
  return html5playerRes ? html5playerRes[1] || html5playerRes[2] : null;
};


export default async (req, res) => {
  const { podcastId } = req.query;

  const request = await axios({
    method: 'POST',
    headers: requestHeaders,
    url: requestUrl,
    data: JSON.stringify(getRequestBody(podcastId)),
  });
  let format = request.data.streamingData.formats[0];
  if (!format.url) {
    const { data: html5player } = await axios(`http://www.youtube.com/embed/${podcastId}?enablejsapi=1`);
    const playerInfo = 'https://youtube.com/' + getHTML5player(html5player);
    format = await decipherFormats(format, playerInfo, {});
    if (!format.url) {
      throw new Error('Can not get audio Url');
    }
  }
  return res.status(200).json({
    url: format.url,
    success: true,
  })
}
