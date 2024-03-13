import "./App.css";
import ConversorDivisasDolar from "./components/conversor/ConversorDivisasDolar";
import {
  Box,
  ChakraProvider,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import CotizacionesMonedas from "./components/conversor/ConversorDivisasEuro";
import LottieAnimation from "./components/Lottie";

function App() {
  return (
    <ChakraProvider>
      <Container>
        <LottieAnimation />
        <Box h={"100vh"} w={"100%"}>
          <Tabs isLazy>
            <TabList>
              <Tab role="tab">Dolar</Tab>
              <Tab role="tab">Divisas</Tab>
            </TabList>
            <TabPanels>
              {/* initially mounted */}
              <TabPanel>
                <ConversorDivisasDolar />
              </TabPanel>
              {/* initially not mounted */}
              <TabPanel>
                <CotizacionesMonedas />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default App;
