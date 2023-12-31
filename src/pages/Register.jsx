import Form from 'components/Form';
import FormInput from 'components/FormInput';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchSignup } from 'redux/auth/operations';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async event => {
    event.preventDefault();

    const form = event.target;
    const name = form.elements.user_name.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    const userRegisterInfo = { name, email, password };

    try {
      await dispatch(fetchSignup(userRegisterInfo));
      navigate('/contacts');
      toast.success('Successfully registered. Please, log in');
      form.reset();
    } catch (error) {
      toast.error('Something went wrong, please try again');
    }
  };

  return (
    <Form handleSubmit={handleSubmit} buttonText="Register">
      <FormInput type="text" name="user_name" label="Name" />
      <FormInput type="email" name="email" label="Email" />
      <FormInput type="password" name="password" label="Password" />
    </Form>
  );
};

export default Register;
