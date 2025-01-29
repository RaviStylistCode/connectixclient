import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import postReducer from "./postSlice";
import SocketReducer from "./socketSlice";
import RealTimeNotificationReducer from "./rtnSlice";
import AdminReducer from "./adminSlice";


import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  
  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer=combineReducers({
    auth:authReducer,
    post:postReducer,
    socket:SocketReducer,
    realtimenotification:RealTimeNotificationReducer,
    admin:AdminReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer);

const store=configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;