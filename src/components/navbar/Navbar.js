import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
} from "@chakra-ui/icons";

const Navbar = (props) => {
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        p={2}
        top={0}
        zIndex={2}
        position={"sticky"}
        backdropFilter="blur(10px)"
        borderBottom={"none"}
        bg="rgb(26, 31, 45, 0.8)"
        w="100%"
      >
        <Box>
          <Text as={'b'} color={'white'}>DolarGaucho<Text color={'green.200'} as={'span'}>.com.ar</Text></Text>
        </Box>
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              size={"sm"}
              aria-label="Options"
              color={"white"}
              icon={<HamburgerIcon />}
              variant="outline"
              _hover={{ bg: "whiteAlpha.200" }}
            />

            <MenuList>
              <MenuItem icon={<AddIcon />} command="⌘T">
                New Tab
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
                New Window
              </MenuItem>
              <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
                Open Closed Tab
              </MenuItem>
              <MenuItem icon={<EditIcon />} command="⌘O">
                Open File...
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
