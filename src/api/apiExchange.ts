import { API_KEY, API_ROOT_PATH } from "../constants";
import { IExchangeData } from "../types/IExchangeData";

/* List of available currencies */

export const getListAvailableCurrencies = async () => {
  const endpoint = `${API_ROOT_PATH}/currencies?active=true`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

/* Minimal exchange amount */

export const getMinimalExchangeAmount = async (pairCoins: string) => {
  const endpoint = `${API_ROOT_PATH}/min-amount/${pairCoins}?api_key=${API_KEY}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    
  }
  return data.minAmount;
};

/* Estimated exchange amount */

export const getEstimatedExchangeAmount = async (
  exchangeData: IExchangeData
) => {
  const { currencyFrom, currencyTo, amountForExchange } = exchangeData;
  const endpoint = `${API_ROOT_PATH}/exchange-amount/${amountForExchange}/${currencyFrom}_${currencyTo}?api_key=${API_KEY}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    
  }
  return data.estimatedAmount;
};
