import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import superAdminReducer from "./superAdminReducer/superAdminReducer";
import utilityReducer from "./utilityReducer/UtilityReducer";
import persistReducer from "redux-persist/es/persistReducer";
import DataTreeReducer from "./dataTree/DataTreeReducer";

const RootReducer = combineReducers({
  SuperAdmin: superAdminReducer,
  Util: utilityReducer,
  Tree_Data: DataTreeReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const Store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(Store);
