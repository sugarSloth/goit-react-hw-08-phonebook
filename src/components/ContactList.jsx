import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteContact, fetchContacts } from 'redux/contacts/operations';
import {
  selectContacts,
  selectError,
  selectFilteredContacts,
  selectIsLoading,
} from 'redux/contacts/selectors';
import ContactListItem from 'components/ContactListItem';
import { Container, List, Text } from '@chakra-ui/react';
import Loader from './Loader';

export function ContactList({ onOpen }) {
  const dispatch = useDispatch();
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteButton = async (id, name) => {
    try {
      await dispatch(deleteContact(id)).unwrap();
      toast.success(`${name} successfully deleted!`);
    } catch (error) {
      toast.error(`Something went wrong, ${name} not deleted. Try again`);
    }
  };

  const renderContacts = () => {
    if (isLoading) {
      return <Loader />;
    } else if (error) {
      return <Text>{error}</Text>;
    } else if (!isLoading && !error && contacts.length === 0) {
      return <Text>You don't have contacts yet</Text>;
    } else {
      let contactsToDisplay =
        filteredContacts.length > 0 ? filteredContacts : contacts;

      return (
        <List>
          {contactsToDisplay.map(({ id, name, number }) => (
            <ContactListItem
              key={id}
              handleDeleteButton={handleDeleteButton}
              id={id}
              name={name}
              number={number}
              onOpen={onOpen}
            />
          ))}
        </List>
      );
    }
  };

  return <Container mt="16px">{renderContacts()}</Container>;
}
