import {
  Button,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import FormInput from './FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentContact } from 'redux/contacts/selectors';
import { editContact } from 'redux/contacts/operations';
import { toast } from 'react-toastify';

const inputStyles = {
  display: 'inline',
  maxWidth: '400px',
};

const ContactModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { id, name, number } = useSelector(selectCurrentContact);

  const handleSubmit = event => {
    event.preventDefault();

    const form = event.currentTarget;
    const newName = form.elements.name.value;
    const newNumber = form.elements.phone.value;

    if (name !== newName || number !== newNumber) {
      const contact = {
        id,
        name: newName,
        number: newNumber,
      };
      dispatch(editContact(contact))
        .unwrap()
        .then(() => toast.success(`${newName} successfully edited!`))
        .catch(() =>
          toast.error(`Something went wrong, ${newName} not edited. Try again.`)
        );

      onClose();
    } else {
      toast.info('Any changes edited.');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit contact</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl
            as="form"
            onSubmit={handleSubmit}
            textAlign="center"
            mb="16px"
          >
            <FormInput
              styles={inputStyles}
              type="text"
              name="name"
              label="Name"
              value={name}
              pattern="^[\\sa-zA-Z'-]*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />

            <FormInput
              styles={inputStyles}
              type="tel"
              name="phone"
              label="Phone"
              value={number}
              pattern="[\+]\d{2}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}"
              title="Format: +38 (xxx) xxx-xx-xx"
            />
            <Button onClick={onClose} variant="ghost" mr={3}>
              Go back
            </Button>
            <Button type="submit" colorScheme="purple">
              Save changes
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactModal;
