import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/NotificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers } from "redux";
import filterReducer from "./reducers/FilterReducer";
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(reducer, composeWithDevTools());
console.log(store.getState());
