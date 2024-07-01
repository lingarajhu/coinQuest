export const OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": process.env.REACT_APP_COINGECO_API_KEY,
  },
};

export const parseOptions = {
  replace(domNode) {
    if (domNode.attribs && domNode.attribs.class === "remove") {
      return <></>;
    }
  },
};

export const chartDays = [
  {
    lable: "24 Hours",
    value: 1,
  },
  {
    lable: "30 Days",
    value: 30,
  },
  {
    lable: "3 Months",
    value: 90,
  },
  {
    lable: "1 Year",
    value: 365,
  },
];

export const TRENDING_COINS = `https://api.coingecko.com/api/v3/search/trending`;

export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=bitcon&category=layer-1&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h&locale=en&precision=2`;

export const SingleCoin = (id) =>
  `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalData = (id, days, currency) => {
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;
};
