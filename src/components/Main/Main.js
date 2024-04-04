import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import ConversorDivisasDolar from "../conversor/ConversorDivisasDolar"
import CotizacionesMonedas from "../conversor/ConversorDivisasEuro"
import DolarChart from "../Indice/Dolar"
import Tasas from "../tasas/Tasas"
import CommodityInfo from "../Commodities/Commodities"


const Main = () => {
    return(
        <Box w={"100%"} color={"white"}>
            <Tabs align="center" isLazy>
              <TabList>
                <Tab role="tab">Dolar</Tab>
                <Tab role="tab">Divisas</Tab>
                <Tab role="tab">Graficos</Tab>
                <Tab role="tab">Tasas</Tab>
                <Tab role="tab">Cripto</Tab>
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
                <TabPanel>
                  <DolarChart />
                </TabPanel>
                <TabPanel><Tasas /></TabPanel>
                <TabPanel><CommodityInfo /></TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
    )
}

export default Main