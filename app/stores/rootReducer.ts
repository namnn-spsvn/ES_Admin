import { createReducer } from "@/fer-framework/fe-base/reducers";
import searchSlice from "@/fer-framework/fe-component/reducers/SearchSlice";
import authSlice from "@/fer-framework/fe-module-auth/reducers";

const appRootReducer = createReducer({
  auth: authSlice,
  search: searchSlice,
});

export const reducer = (state: any, action: any) =>
  appRootReducer(state, action);
