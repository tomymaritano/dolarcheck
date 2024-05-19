import { Box, Heading, Image, Flex, Text, Button } from "@chakra-ui/react";

const Hero = () => {
    return (
        <Box
            position="relative"
            h="100vh"
            w="100%"
            overflow="hidden"
        >
            <Flex
                direction="column"
                align="center"
                justify="center"
                h="100%"
                 color="white"
            >
<Heading as="h1" size="2xl" bgColor={'darkseagreen'}>
                    Dolar Gaucho
                </Heading>
                <Text pt={2} fontSize={'md'}> Mantente actualizado.</Text>
                <Button size={'sm'} colorScheme="gray" mt={10}>Colaborar</Button>

            </Flex>
        </Box>
    );
};

export default Hero;
