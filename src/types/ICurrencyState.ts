import { ICurrencyItem } from "./ICurrencyItem";

export interface ICurrencyState {
  availableCurrencies: Array<ICurrencyItem>;
  error?: string;
}