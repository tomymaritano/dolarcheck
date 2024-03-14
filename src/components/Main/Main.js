import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ConversorDivisasDolar from "../conversor/ConversorDivisasDolar"
import CotizacionesMonedas from "../conversor/ConversorDivisasEuro"


const Main = () => {
    return(
        <Box w={"100%"} color={"white"}>
            <Tabs isLazy>
              <TabList>
                <Tab role="tab">Dolar</Tab>
                <Tab role="tab">Divisas</Tab>
              </TabList>
              <TabPanels>
                {/* initially mounted */}
                <TabPanel>
                  <ConversorDivisasDolar/>
                </TabPanel>
                {/* initially not mounted */}
                <TabPanel>
                  <CotizacionesMonedas />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
    )
}

export default Main