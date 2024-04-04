import { useState, useEffect } from 'react';
import { Box, Text, Spinner, SimpleGrid, Heading, Container } from '@chakra-ui/react';

const CommodityInfo = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://real-time-finance-data.p.rapidapi.com/search?query=Apple&language=en",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": "5ab300eec4msh46ad162a736f0c1p122093jsnb87e3c78c259",
              "X-RapidAPI-Host": "real-time-finance-data.p.rapidapi.com",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error fetching data: {error.message}</Text>;
  }

  return (
    <Container maxW="container.xl" centerContent>
      <Heading as="h2" size="xl" my="4">Search Results</Heading>
      <SimpleGrid columns={[1, 2, 3]} spacing="20px">
        {data?.results?.map((item) => (
          <Box key={item.symbol} p="5" shadow="md" borderWidth="1px">
            <Heading fontSize="xl">{item.name} ({item.symbol})</Heading>
            <Text mt={4}>Type: {item.type}</Text>
            <Text>Price: {item.price}</Text>
            <Text>Change: {item.change} ({item.change_percent}%)</Text>
            <Text>Last Update: {item.last_update_utc}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default CommodityInfo;
