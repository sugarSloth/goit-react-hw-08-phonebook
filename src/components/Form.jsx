import { Button, FormControl } from '@chakra-ui/react';

const Form = ({ children, handleSubmit, buttonText }) => (
  <FormControl as="form" onSubmit={handleSubmit} textAlign="center" mb="16px">
    {children}
    <Button type="submit" mt="12px">
      {buttonText}
    </Button>
  </FormControl>
);

export default Form;
