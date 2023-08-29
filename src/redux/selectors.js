import { createSelector } from 'reselect';

export const selectFilter = state => state.filter.value;

export const selectContacts = state => state.contacts.items;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;
