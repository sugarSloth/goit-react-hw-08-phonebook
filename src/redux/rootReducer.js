import { combineReducers } from 'redux';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filtersSlice';

export const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});
