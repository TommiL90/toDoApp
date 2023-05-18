import { Box, Grid } from '@chakra-ui/react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import { Suspense, useContext } from 'react';
import { TasksContext } from '../../contexts/TaskContexts';

const Dashboard = () => {
  const { tasks } = useContext(TasksContext);

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
        <Suspense fallback={<p>Carregando...</p>}>
          {tasks.map((task) => (
            <Card
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
            />
          ))}
        </Suspense>
      </Grid>
    </Box>
  );
};

export default Dashboard;
