import { Box, Button, Flex, Heading, HStack, Progress, Text } from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { useContext } from 'react';
import { iTask, TasksContext } from '../../contexts/TaskContexts';

interface iTaskProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  onClick: (task: iTask) => void;
}

function Card({ id, title, description, completed, createdAt, updatedAt, onClick }: iTaskProps) {
  const { deleteTask, updateTask } = useContext(TasksContext);
  const token: string | null = localStorage.getItem('@to-do:Token');
  const userId: string | null = localStorage.getItem('@to-do:UserId');
  const createdAtDate = new Date(createdAt);
  const updatedAtDate = new Date(updatedAt);

  function handleDeleteTask() {
    if (token) {
      deleteTask(id);
    } else {
      throw new Error('Token not found');
    }
  }

  function handleUpdateTask() {
    if (token) {
      updateTask(id, completed);
    } else {
      throw new Error('Token not found');
    }
  }

  return (
    <Box
      cursor='pointer'
      _hover={{
        transform: 'translateY(-7px)',
        borderColor: theme.colors.gray200,
      }}
      transition='border 0.2s. ease 0.1s. transform 0.2s'
      boxShadow='base'
      p='8'
      w={['80vw', 'auto']}
    >
      <Flex justify='space-between'>
        <Heading as='h3' fontSize='h3'>
          {title}
        </Heading>
        <HStack spacing='4'>
          <Button border='1px' borderColor='gray200' bgColor='gray100' onClick={handleDeleteTask}>
            <FaTrash fontSize='1rem' color={theme.colors.gray300} />
          </Button>
          <Button
            border='1px'
            borderColor='gray200'
            bgColor={completed ? 'purple.500' : 'gray100'}
            onClick={handleUpdateTask}
          >
            <FaCheck
              fontSize='1rem'
              color={completed ? theme.colors.gray100 : theme.colors.gray300}
            />
          </Button>
        </HStack>
      </Flex>
      <Flex
        flexDirection='column'
        gap='1rem'
        onClick={() =>
          onClick({
            id,
            title,
            description,
            completed,
            createdAt,
            updatedAt,
            userId: userId ? userId : '',
          })
        }
      >
        <Text>{description}</Text>
        <Progress colorScheme='purple' mt='1rem' value={completed ? 100 : 25} />
        <Text color='gray.300'>
          {completed === false
            ? `Criado em ${createdAtDate.toLocaleDateString()}`
            : `Completado em ${updatedAtDate.toLocaleDateString()}`}
        </Text>
      </Flex>
    </Box>
  );
}

export default Card;
