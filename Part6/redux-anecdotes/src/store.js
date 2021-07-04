import anecdoteReducer from "./reducers/anecdoteReducer";

import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers } from "redux";

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
});

export const store = createStore(reducer, composeWithDevTools());
console.log(store.getState());
