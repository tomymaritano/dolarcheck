import { Box, Highlight, Text } from "@chakra-ui/react";

const FooterBox = () => {
  return (
    <Box as="Footer" bottom={0} mt={4} p={4} textAlign={"center"}>
      <Text color={"white"}>
        <Highlight
          query="DolarGaucho"
          styles={{ px: "1", py: "1", background: "green.500", color: "white", fontWeight: "bold" }}
        >
          App creada por Tomas maritano. DolarGaucho.
        </Highlight>
      </Text>
    </Box>
  );
};

export default FooterBox;
