import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import superAdminReducer from "./superAdminReducer/superAdminReducer";
import utilityReducer from "./utilityReducer/UtilityReducer";

const RootReducer = combineReducers({
  SuperAdmin: superAdminReducer,
  Util: utilityReducer,
});

export const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
