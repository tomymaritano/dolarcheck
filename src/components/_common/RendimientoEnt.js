// src/components/_common/RendimientosEntidadesTable.js
import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, Spinner, Table, Thead, Tbody, Tr, Th, Td, Divider, Select, Image } from '@chakra-ui/react';

// Mapa de monedas a IDs de CoinGecko
const coinGeckoIds = {
  ARS: 'argentine-peso',
  DAI: 'dai',
  USD: 'usd',
  ETH: 'ethereum',
  BTC: 'bitcoin',
  PEN: 'peruvian-sol',
  ADA: 'cardano',
  BNB: 'binancecoin',
  MATIC: 'matic-network',
  DOT: 'polkadot',
  SOL: 'solana',
  MXN: 'mexican-peso',
  NUARS: 'new-argentine-peso',
  USDT: 'tether',
  USDC: 'usd-coin',
  BUSD: 'binance-usd',
  UST: 'terrausd',
  LUNA: 'terra-luna',
  PAXG: 'pax-gold',
  MANA: 'decentraland',
  AXS: 'axie-infinity',
  FTM: 'fantom',
  AVAX: 'avalanche-2',
  NUPEN: 'nuevo-sol',
  RIF: 'rif-token',
  RBTC: 'rsk-smart-bitcoin',
  RDOC: 'rsk-doc',
  COP: 'colombian-peso',
  NCOP: 'new-colombian-peso',
  LAC: 'lac',
  UXD: 'uxd-stablecoin',
  USDM: 'usd-mirror',
  USDL: 'usdl',
  TRX: 'tron',
  WIF: 'wif',
  TON: 'toncoin',
  GNO: 'gnosis',
  ENA: 'ena',
  EURT: 'euro-tether',
  DOGE: 'dogecoin',
  SHIB: 'shiba-inu',
  ARB: 'arbitrum',
  OP: 'optimism',
  PEPE: 'pepe',
  LINK: 'chainlink',
};

const fallbackIconUrl = 'https://path-to-fallback-icon/fallback.png'; // URL de imagen de reserva

const RendimientosEntidadesTable = () => {
  const [rendimientosData, setRendimientosData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [coinIcons, setCoinIcons] = useState({});

  useEffect(() => {
    const fetchRendimientosData = async () => {
      try {
        const response = await fetch('https://api.argentinadatos.com/v1/finanzas/rendimientos');
        if (!response.ok) {
          throw new Error('Error al obtener los datos de Rendimientos');
        }
        const data = await response.json();
        setRendimientosData(data);
        setSelectedEntity(data[0]?.entidad || '');
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRendimientosData();
  }, []);

  useEffect(() => {
    const fetchCoinIcons = async () => {
      const icons = {};
      const coinIds = Object.values(coinGeckoIds).join(',');

      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}`);
        if (!response.ok) {
          throw new Error('Error al obtener los íconos de CoinGecko');
        }
        const data = await response.json();
        data.forEach(coin => {
          icons[coin.id] = coin.image;
        });
        setCoinIcons(icons);
      } catch (error) {
        console.error('Error al obtener los íconos:', error);
      }
    };

    fetchCoinIcons();
  }, []);

  const handleEntityChange = (e) => {
    setSelectedEntity(e.target.value);
  };

  const filteredData = rendimientosData.find(entity => entity.entidad === selectedEntity);

  return (
    <Box p={4}>
      <Heading mb={4} size="md">
        Rendimientos de Entidades Financieras
      </Heading>
      {loading ? (
        <Spinner size="xl" />
      ) : error ? (
        <Text color="red.500">{error}</Text>
      ) : (
        <>
          <Select bg={'white'} placeholder="Seleccione una entidad" onChange={handleEntityChange} mb={4} value={selectedEntity}>
            {rendimientosData.map((entity, index) => (
              <option key={index} value={entity.entidad}>
                {entity.entidad}
              </option>
            ))}
          </Select>
          {filteredData ? (
            <Box p={4} borderRadius="lg" bg="white">
              <Heading size="sm" mb={2}>{filteredData.entidad}</Heading>
              <Divider mb={2} />
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Moneda</Th>
                    <Th isNumeric>APY (%)</Th>
                    <Th>Fecha</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredData.rendimientos.map((rendimiento, i) => (
                    <Tr key={i}>
                      <Td display={'flex'}>
                        <Image
                          src={coinIcons[coinGeckoIds[rendimiento.moneda]] || fallbackIconUrl}
                          alt={rendimiento.moneda}
                          boxSize="20px"
                          mr={2}
                        />
                        {rendimiento.moneda}
                      </Td>
                      <Td isNumeric>{rendimiento.apy}</Td>
                      <Td>{new Date(rendimiento.fecha).toLocaleDateString()}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Text>No hay datos disponibles.</Text>
          )}
        </>
      )}
    </Box>
  );
};

export default RendimientosEntidadesTable;
