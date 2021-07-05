import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/NotificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import filterReducer from "./reducers/FilterReducer";
const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log(store.getState());
