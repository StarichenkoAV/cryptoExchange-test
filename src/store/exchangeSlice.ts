import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICurrencyState } from "../types/ICurrencyState";
import * as Api from "../api/apiExchange";

const defaultCurrencyState: ICurrencyState = {
  availableCurrencies: [],
  error: undefined,
};

export const getAvailableCurrencies = createAsyncThunk(
  "currency/available",
  async () => {
    const availableCoins = await Api.getListAvailableCurrencies();
    return availableCoins;
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
      })
      .addCase(getAvailableCurrencies.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export default exchangeSlice.reducer;
