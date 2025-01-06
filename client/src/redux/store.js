import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import userReducer, { handleLogout } from "./user/userSlice";
import apiSlice from "./store2/apiSlice";
//import { handleLogout } from "./user/userSlice"; // Ensure this is correctly imported

// Root Reducer
const rootReducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"], // Persist only the 'user' slice
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Token Middleware
const tokenMiddleware = (store) => (next) => async (action) => {
  if (action.type.endsWith("/rejected")) {
    const { statusCode } = action.payload || {};
    if (statusCode === 401) {
      store.dispatch(handleLogout());
    }
  }
  return next(action);
};

// Configure Store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(tokenMiddleware)
      .concat(apiSlice.middleware),
});

// Persistor
export const persistor = persistStore(store);
