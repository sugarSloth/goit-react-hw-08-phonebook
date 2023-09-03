import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { IconButton, ListItem } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setCurrentContact } from 'redux/contactsSlice';

const ContactListItem = ({ id, name, number, handleDeleteButton, onOpen }) => {
  const dispatch = useDispatch();

  const handleItemClick = () => {
    onOpen();
    dispatch(setCurrentContact({ id, name, number }));
  };

  const handleDeleteClick = () => {
    handleDeleteButton(id, name);
  };

  return (
    <ListItem mb="12px">
      {name}: {number}
      <IconButton
        onClick={handleItemClick}
        aria-label="Edit current contact"
        icon={<EditIcon />}
        size="sm"
        variant="outline"
        ml="16px"
      />
      <IconButton
        onClick={handleDeleteClick}
        aria-label="Delete current contact"
        icon={<DeleteIcon />}
        size="sm"
        variant="outline"
        ml="16px"
      />
    </ListItem>
  );
};

export default ContactListItem;
