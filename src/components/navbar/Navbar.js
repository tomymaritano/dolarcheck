import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  // MenuItem,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  // AddIcon,
  // ExternalLinkIcon,
  // RepeatIcon,
  // EditIcon,
} from "@chakra-ui/icons";
import Logo from "../assets/LOGO.png"

const Navbar = (props) => {
  return (
    <>
      <Flex
        alignItems={"center"}
        justifyContent={"space-evenly"}
        p={2}
        top={0}
        zIndex={2}
        position={"sticky"}
        backdropFilter="blur(10px)"
        borderBottom={"none"}
        bg="whiteAlpha.100"
        w="100%"
      >
        <Box>
          <Image src={Logo} w={'30px'} />
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
              {/* <MenuItem icon={<AddIcon />} command="⌘T">
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
              </MenuItem> */}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </>
  );
};

export default Navbar;
