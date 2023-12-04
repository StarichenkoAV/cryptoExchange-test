import { API_KEY, API_ROOT_PATH } from "../constants";
import { IExchangeData } from "../types/IExchangeData";

/* Получаем все доступные валюты */

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

/* Получаем минимальную сумму к обмену для пары валют */

export const getMinimalExchangeAmount = async (currencies: string) => {
  const endpoint = `${API_ROOT_PATH}/min-amount/${currencies}?api_key=${API_KEY}`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    return data.message;
  }
  return data.minAmount;
};

/* Получаем итоговую сумму для валюты на которую меняем */

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
    return data.message;
  }
  return data.estimatedAmount;
};
