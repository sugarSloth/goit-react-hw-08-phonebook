export const selectIsLoading = state => state.contacts.isLoading;

export const selectError = state => state.contacts.error;

export const selectFilter = state => state.filter.value;

export const selectContacts = state => state.contacts.items;

export const selectCurrentContact = state => state.contacts.currentContact;

export const selectFilteredContacts = state => {
  const contacts = selectContacts(state);
  const filter = selectFilter(state);

  if (contacts === undefined || filter === undefined) {
    return [];
  }

  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );
};
