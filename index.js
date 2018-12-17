const { urlToEndpoint, promiseGet } = require('@everymundo/promise-data-to');

const IDENTITY_ENDPOINT = urlToEndpoint('http://169.254.169.254/latest/dynamic/instance-identity/document');
// IDENTITY_ENDPOINT.method = 'GET';
IDENTITY_ENDPOINT.maxRetry = 1;

if (process.env.SOCKS_PROXY) {
  const SocksProxyAgent = require('socks-proxy-agent');
  IDENTITY_ENDPOINT.agent = new SocksProxyAgent(process.env.SOCKS_PROXY);
}

const parseResponseText = ({resTxt}) => JSON.parse(resTxt);

const getIdentityDocument = () => promiseGet(IDENTITY_ENDPOINT)
    .then(parseResponseText);

module.exports = {
  parseResponseText,
  getIdentityDocument,
  IDENTITY_ENDPOINT,
};
