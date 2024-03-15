import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import InflationChart from "../inflacion/InflacionMensual";
import InflationAnual from "../inflacion/InflacionAnual";

const Indice = () => {
  return (
    <Box w={'100%'} color={'white'} p={4} >
      <Tabs colorScheme='green'>
        <TabList>
          <Tab role="tab">Mensual</Tab>
          <Tab role="tab">Interanual</Tab>
        </TabList>
        <TabPanels>
          {/* initially mounted */}
          <TabPanel>
            <InflationChart />
          </TabPanel>
          {/* initially not mounted */}
          <TabPanel>
            <InflationAnual />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Indice;
