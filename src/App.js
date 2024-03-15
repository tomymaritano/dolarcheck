import { ChakraProvider, Container, Divider, VStack } from "@chakra-ui/react";

import LottieAnimation from "./components/Lottie";
import Navbar from "./components/navbar/Navbar";
import Main from "./components/Main/Main";
import FooterBox from "./components/Footer/Footer";
import theme from "./extendTheme";
import PresidencialGraph from "./components/Eventos/Eventos";


function App() {
  return (
    <ChakraProvider theme={theme}>
      <VStack minH={"100vh"} bg={"#1a1f2d"}>
        <Container bg={"#1a1f2d"}>
          <Navbar />
          <LottieAnimation />
          <PresidencialGraph />
          <Main />
          <Divider />
        </Container>
        <FooterBox />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
