import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  addContact,
  deleteContact,
  editContact,
} from './fetchContacts';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  currentContact: {},
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items.splice(index, 1);
        }
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.isModalOpen = false;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
export const { setCurrentContact } = contactsSlice.actions;
