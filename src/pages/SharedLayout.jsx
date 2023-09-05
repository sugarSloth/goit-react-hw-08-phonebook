import {
  Badge,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
} from '@chakra-ui/react';
import { AtSignIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { fetchLogout } from 'redux/auth/operations';
import { selectToken, selectUserEmail } from 'redux/auth/selectors';

const buttonStyles = {
  color: 'white',
  backgroundColor: 'purple',
};

const SharedLayout = () => {
  const email = useSelector(selectUserEmail);
  const isAuth = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    dispatch(fetchLogout());
    navigate('/');
  };

  return (
    <>
      <Flex
        as={'header'}
        justify="space-between"
        alignItems="center"
        wrap="wrap"
        gap="12px"
        p={{ base: '16px', sm: '24px' }}
        maxW="1200px"
        mr="auto"
        ml="auto"
        borderBottom="1px solid"
        borderColor="purple"
      >
        <Heading
          as="h1"
          fontSize={{ base: '16px', sm: '24px', md: '30px', lg: '30px' }}
        >
          Phonebook
        </Heading>
        {isAuth ? (
          <Flex gap={{ base: '12px', sm: '24px' }}>
            <Badge
              textTransform="lowercase"
              borderRadius="8px"
              p={{ base: '8px', sm: '12px' }}
            >
              <Icon as={AtSignIcon} mr="8px" />
              {email}
            </Badge>
            <Button
              onClick={handleLogoutClick}
              p={{ base: '8px', sm: '12px' }}
              sx={buttonStyles}
            >
              Log out
              <Icon as={ArrowForwardIcon} ml="8px" />
            </Button>
          </Flex>
        ) : (
          <Flex gap={{ base: '12px', sm: '24px' }}>
            <Button
              as={Link}
              to="/"
              p={{ base: '8px', sm: '12px' }}
              sx={buttonStyles}
            >
              Log in
            </Button>
            <Button
              as={Link}
              to="/register"
              p={{ base: '8px', sm: '12px' }}
              sx={buttonStyles}
            >
              Sign up
            </Button>
          </Flex>
        )}
      </Flex>

      <main>
        <Container p="16px">
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default SharedLayout;
