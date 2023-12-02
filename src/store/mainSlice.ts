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
  extraReducers: (builder) => {
    builder
      .addCase(getAvailableCoins.fulfilled, (state, action) => {
        const availableCoins = action.payload;
        state.availableCoins = availableCoins;
        state.errorPairs = null;
      })
      .addCase(getAvailableCoins.rejected, (state, action) => {
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

export default mainSlice.reducer;
