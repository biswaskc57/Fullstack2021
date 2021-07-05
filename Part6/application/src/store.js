import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

console.log(store.getState());
