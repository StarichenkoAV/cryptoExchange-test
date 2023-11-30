export interface ICurrencyState {
    availableCoins: Array<string> ,
    error?: string,
    minAmount: string,
    resExchange: string,
    errorPairs: string | null,
}