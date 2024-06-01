// src/components/NavLink.js
import React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link, useColorModeValue } from '@chakra-ui/react';

const NavLink = ({ to, children }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Link
      as={ReactRouterLink}
      to={to}
      p={2}
      fontSize={'sm'}
      fontWeight={500}
      color={linkColor}
      _hover={{
        textDecoration: 'none',
        color: linkHoverColor,
      }}
    >
      {children}
    </Link>
  );
};

export default NavLink;
