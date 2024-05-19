import { ChakraProvider, Container, Divider, VStack } from "@chakra-ui/react";

// import LottieAnimation from "./components/Lottie";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/Main/Main";
import FooterBox from "./components/Footer/Footer";
import theme from "./extendTheme";
import PresidencialGraph from "./components/Eventos/Eventos";
import Hero from "./components/Hero/Hero";




function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack minH={"100vh"} bg={"#1a1f2d"}>
         <Navbar />
        <Container maxW={'6xl'} bg={"#1a1f2d"}>
         <Hero />
          <Divider mb={6} />
          <PresidencialGraph />
          <Main />
          <Divider mt={20} />
        </Container>

        <FooterBox />
      </VStack>
      
    </ChakraProvider>
  );
}

export default App;
