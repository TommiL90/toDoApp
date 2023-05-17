import { Box, Grid } from '@chakra-ui/react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';

const Dashboard = () => {
  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid
        w='100%'
        maxW={1280}
        marginX='auto'
        templateColumns='repeat(auto-fill, minmax(420px, 1fr))'
        gap='1rem'
        p='4'
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <Card key={n} />
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
