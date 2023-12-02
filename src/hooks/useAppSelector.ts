import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { StoreStateType } from "../store";
export const useAppSelector: TypedUseSelectorHook<StoreStateType> = useSelector;
