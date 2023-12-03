import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICurrencyState } from "../types/ICurrencyState";
import { IExchangeData } from "../types/IExchangeData";
import * as Api from "../api/apiExchange";

const defaultCurrencyState: ICurrencyState = {
  availableCurrencies: [],
  error: undefined,
  minAmount: "",
  resExchange: "",
  errorPairs: null,
};

export const getAvailableCurrencies = createAsyncThunk(
  "currency/available",
  async () => {
    const availableCoins = await Api.getListAvailableCurrencies();
    return availableCoins;
  }
);

export const getPairTicketCoins = createAsyncThunk(
  "currency/min-amount",
  async (pairCoins: string) => {
    const minAmoutPair = await Api.getMinimalExchangeAmount(pairCoins);
    return minAmoutPair;
  }
);

export const getExchangeData = createAsyncThunk(
  "currency/exchange-amount",
  async (exchangeData: IExchangeData) => {
    const resExchange = await Api.getEstimatedExchangeAmount(exchangeData);
    console.log(exchangeData, `resExchange`);
    return resExchange;
  }
);

export const exchangeSlice = createSlice({
  name: "currency",
  initialState: defaultCurrencyState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableCurrencies.fulfilled, (state, action) => {
        const availableCurrencies = action.payload;
        state.availableCurrencies = availableCurrencies;
        state.errorPairs = null;
      })
      .addCase(getAvailableCurrencies.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getPairTicketCoins.fulfilled, (state, action) => {
        const minAmount = action.payload;
        state.minAmount = minAmount;
        state.errorPairs = null;
      })
      .addCase(getPairTicketCoins.rejected, (state, action) => {
        state.errorPairs = "This pair is disabled now";
      })
      .addCase(getExchangeData.fulfilled, (state, action) => {
        const resExchange = action.payload;
        state.resExchange = resExchange;
        state.errorPairs = null;
      })
      .addCase(getExchangeData.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default exchangeSlice.reducer;
