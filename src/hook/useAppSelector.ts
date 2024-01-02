import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../screens/store/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;