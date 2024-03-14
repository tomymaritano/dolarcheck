import { ChakraProvider, Container, Divider, VStack } from "@chakra-ui/react";

import LottieAnimation from "./components/Lottie";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Indice from "./components/Indice/Indice";

function App() {
  return (
    <ChakraProvider>
      <VStack minH={"100vh"} bgColor={"#1a1f2d"}>
        <Container bgColor={"#1a1f2d"}>
          <Navbar />
          <LottieAnimation />
          <Main />
          <Divider />
          <Indice />
        </Container>
        <Footer />
      </VStack>
    </ChakraProvider>
  );
}

export default App;
