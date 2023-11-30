import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICurrencyState } from "../types/ICurrencyState";
import { IExchangeData } from "../types/IExchangeData";
import * as Api from "../api/apiExchange";

const defaultCurrencyState: ICurrencyState = {
  availableCoins: [],
  error: undefined,
  minAmount: "",
  resExchange: "",
  errorPairs: null,
};

export const getAvailableCoins = createAsyncThunk(
  "coins/available",
  async () => {
    const availableCoins = await Api.getListAvailableCurrencies();
    return availableCoins;
  }
);

export const getPairTicketCoins = createAsyncThunk(
  "coins/min-amount",
  async (pairCoins: string) => {
    const minAmoutPair = await Api.getMinimalExchangeAmount(pairCoins);
    return minAmoutPair;
  }
);

export const getExchangeData = createAsyncThunk(
  "coins/exchange-amount",
  async (exchangeData: IExchangeData) => {
    const resExchange = await Api.getEstimatedExchangeAmount(exchangeData);
    return resExchange;
  }
);

export const mainSlice = createSlice({
  name: "coins",
  initialState: defaultCurrencyState,
  reducers: {},

});

export default mainSlice.reducer;
