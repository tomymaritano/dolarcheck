import React from 'react';
import { Box, Flex, Text, IconButton, Stack, useColorModeValue, Image, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { FaGithub, FaTwitter, FaInstagram, FaFlipboard } from 'react-icons/fa';
import logo from '../assets/LOGO.png';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname === '/' ? 'Home' : location.pathname.replace('/', '');

  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  const socialLinks = [
    { icon: FaGithub, url: 'https://github.com', label: 'Github' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaFlipboard, url: 'https://flipboard.com', label: 'Flipboard' },
  ];

  return (
    <Box width="100%" position="fixed" top="0" zIndex="1000" bg={useColorModeValue('white', 'gray.800')}>
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify="space-between"
      >
        <Flex align="center">
          <Image src={logo} w={'30px'} />
          <Text ml={3} fontSize="lg" fontWeight="bold">
            DolarGaucho / {currentPath.charAt(0).toUpperCase() + currentPath.slice(1)}
          </Text>
        </Flex>
        <Stack direction={'row'} spacing={1}>
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.url} isExternal>
              <IconButton
                icon={<link.icon />}
                aria-label={link.label}
                variant="ghost"
                color={linkColor}
                _hover={{ color: linkHoverColor }}
              />
            </Link>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Header;
