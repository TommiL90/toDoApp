import { Box, Grid, useDisclosure } from '@chakra-ui/react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import { Suspense, useContext, useState } from 'react';
import { TasksContext, iTask } from '../../contexts/TaskContexts';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';

const Dashboard = () => {
  const { tasks } = useContext(TasksContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<iTask>({} as iTask);

  const handleOpenModal = (task: iTask) => {
    setSelectedTask(task);
    onOpen();
  };

  return (
    <>
      <ModalTaskDetail isOpen={isOpen} onClose={onClose} task={selectedTask} />
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
                onClick={handleOpenModal}
              />
            ))}
          </Suspense>
        </Grid>
      </Box>
    </>
  );
};

export default Dashboard;
