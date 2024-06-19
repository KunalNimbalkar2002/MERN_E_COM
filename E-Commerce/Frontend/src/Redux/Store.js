// import { createStore, applyMiddleware } from "redux";
// import { thunk } from "redux-thunk";
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// import reducers from "./Reducers/indexx";

// export const store = createStore(reducers, {}, applyMiddleware(thunk));

// export default store;

import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import reducers from "./Reducers/indexx";

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "isAuthenticatedUser"], // include isAuthenticatedUser in the persisted state
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, reducers);

// Create the store with the persisted reducer and apply middleware
export const store = createStore(persistedReducer, {}, applyMiddleware(thunk));

// Create the persistor
export const persistor = persistStore(store);

// Export the store as default for use in other parts of the application
export default store;
