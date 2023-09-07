import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import { Filter } from 'components/Filter';
import { selectFilteredContacts } from 'redux/contacts/selectors';
import { useSelector } from 'react-redux';
import { Heading, useDisclosure } from '@chakra-ui/react';
import ContactModal from 'components/ContactModal';
import { useState, useEffect } from 'react';

const Contacts = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(true);
  const [loadedContactCount, setLoadedContactCount] = useState(0);

  useEffect(() => {
    // Завантаження даних тут
    // Після завершення завантаження:
    setIsLoading(false);
    setLoadedContactCount(filteredContacts.length);
  }, [filteredContacts]);

  return (
    <>
      <ContactModal isOpen={isOpen} onClose={onClose} />
      <ContactForm />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Heading as="h3" mt="30px" mb="30px">
            Contacts ({loadedContactCount})
          </Heading>
          <Filter />
          <ContactList onOpen={onOpen} />
        </>
      )}
    </>
  );
};

export default Contacts;
