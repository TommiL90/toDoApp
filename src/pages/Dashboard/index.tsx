import {
  Box,
  Center,
  Grid,
  Heading,
  useDisclosure,
  Text,
  Stack,
  Skeleton,
  Button,
} from '@chakra-ui/react';
import Card from '../../components/Card';
import Header from '../../components/Header';
import SearchBox from '../../components/SearchBox';
import { useContext, useState } from 'react';
import { TasksContext, iTask } from '../../contexts/TaskContexts';
import { ModalTaskDetail } from '../../components/Modal/ModalTaskDetail';
import CardSkeleton from '../../components/Skeleton';
import { FaClipboardList } from 'react-icons/fa';
import ModalCreateTask from '../../components/Modal/ModalCreateTask';

const Dashboard = () => {
  const { tasks, loading, notFound, taskNotFound } = useContext(TasksContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenCreateTask,
    onOpen: onOpenCreateTask,
    onClose: onCloseCreateTask,
  } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<iTask>({} as iTask);

  const handleOpenModal = (task: iTask) => {
    setSelectedTask(task);
    onOpen();
  };

  if (notFound) {
    return (
      <>
        <ModalTaskDetail isOpen={isOpen} onClose={onClose} task={selectedTask} />
        <Box>
          <Header />
          <SearchBox />
          <Center mt='4' textAlign='center' display='flex' flexDir='column'>
            <Heading>Não encontramos resultados para:</Heading>
            <Text fontSize='xl' color='gray.500' fontWeight='bold' mt='4'>
              {taskNotFound}
            </Text>
            <Box mt='8' w={['80%', '40%']}>
              <Stack mb='4'>
                <Skeleton
                  height='20px'
                  width='80%'
                  startColor='gray.200'
                  endColor='gray.300'
                  borderRadius='20px'
                />
                <Skeleton
                  height='20px'
                  width='60%'
                  startColor='gray.200'
                  endColor='gray.300'
                  borderRadius='20px'
                />
              </Stack>
              <Stack>
                <Skeleton
                  height='15px'
                  width='80%'
                  startColor='gray.100'
                  endColor='gray.300'
                  borderRadius='20px'
                />
                <Skeleton
                  height='15px'
                  width='60%'
                  startColor='gray.100'
                  endColor='gray.300'
                  borderRadius='20px'
                />
              </Stack>
            </Box>
          </Center>
        </Box>
      </>
    );
  }

  return (
    <>
      <ModalTaskDetail isOpen={isOpen} onClose={onClose} task={selectedTask} />
      <Box>
        <Header />
        {!loading && !tasks.length ? (
          <>
            <SearchBox />
            <Box
              mt='4'
              w='90vw'
              paddingY='16'
              paddingX={['6', '0']}
              ml='5vw'
              justifyContent='center'
              textAlign='center'
              borderWidth='2px'
              borderColor='gray.200'
              borderStyle='dashed'
            >
              <Center fontSize='5xl'>
                <FaClipboardList color='#bdbdbd' />
              </Center>
              <Heading as='h1' fontSize='2xl' my='4' color='gray.400' fontWeight='bold'>
                Vamos criar a sua primeira tarefa
              </Heading>
              <Text color='grey.400'>
                Insira a sua meta e mostra a você mesmo <b />
                capacidade em cumprir <b>suas atividades</b>
              </Text>
              <Button
                p='6'
                mt='6'
                bg='purple.800'
                color='white'
                fontWeight='bold'
                _hover={{ bg: 'purple.700' }}
                onClick={onOpenCreateTask}
              >
                Criar a sua Primeira tarefa
              </Button>
              <ModalCreateTask isOpen={isOpenCreateTask} onClose={onCloseCreateTask} />
            </Box>
          </>
        ) : (
          <>
            <SearchBox />
            <Grid
              w='100%'
              maxW={1280}
              marginX='auto'
              templateColumns='repeat(auto-fill, minmax(420px, 1fr))'
              gap='1rem'
              p='4'
            >
              {loading ? (
                <>
                  <CardSkeleton repeatCount={9} />
                </>
              ) : (
                <>
                  {tasks.map((task) => (
                    <Card
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      description={task.description}
                      completed={task.completed}
                      createdAt={task.createdAt}
                      updatedAt={task.updatedAt}
                      onClick={handleOpenModal}
                    />
                  ))}
                </>
              )}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
