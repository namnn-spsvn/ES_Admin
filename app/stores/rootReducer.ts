import { createReducer } from "@/fer-framework/fe-base/reducers";
import authSlice from "@/fer-framework/fe-module-auth/reducers";

const appRootReducer = createReducer({
  auth: authSlice,
});

export const reducer = (state: any, action: any) =>
  appRootReducer(state, action);
