import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts/slice';
import { filterReducer } from './contacts/slice';
import { userReducer } from './auth/slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
