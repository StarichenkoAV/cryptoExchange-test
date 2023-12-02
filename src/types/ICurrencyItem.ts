import { IOption } from "./IOption";
export interface ICurrencyItem extends IOption {
    featured: boolean;
    hasExternalId: boolean;
    isFiat: boolean;
    isStable: boolean;
    supportsFixedRate: boolean;
  };

  