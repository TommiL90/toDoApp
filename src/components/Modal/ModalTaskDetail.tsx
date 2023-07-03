import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Center,
  Box,
  HStack,
  Heading,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { FaCheck, FaCube, FaTimes, FaTrash } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { TasksContext, iTask } from '../../contexts/TaskContexts';
import { useContext } from 'react';

interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: iTask;
}

export const ModalTaskDetail = ({ isOpen, onClose, task }: ModalTaskDetailProps) => {
  const { updateTask, deleteTask } = useContext(TasksContext);
  const token: string | null = localStorage.getItem('@to-do:Token');
  const userId: string | null = localStorage.getItem('@to-do:UserId');

  function handleDeleteTask() {
    if (token) {
      deleteTask(task.id, token);
      onClose();
    } else {
      throw new Error('Token not found');
    }
  }

  function handleCompleteTask() {
    if (token && userId) {
      updateTask(task.id, Number(userId), token);
      onClose();
    } else {
      throw new Error('Token not found');
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display='flex' justifyContent='space-between'>
          <Flex>
            <Center bg='purple.500' mr='1' w='30px' h='30px' border-borderRadius='5px'>
              <FaCube color={theme.colors.white} size={20} />
            </Center>
            <Text fontWeight='bold' ml='2'>
              Visualizar
            </Text>
          </Flex>
          <HStack spacing='2'>
            <Center
              as='button'
              ml='auto'
              w='32px'
              h='32px'
              onClick={handleDeleteTask}
              fontSize='20px'
              bg='red.600'
            >
              <FaTrash color={theme.colors.white} />
            </Center>
            <Center
              as='button'
              ml='auto'
              w='32px'
              h='32px'
              onClick={handleCompleteTask}
              fontSize='20px'
              bg='red.600'
            >
              <FaCheck color={theme.colors.white} />
            </Center>
            <Center
              as='button'
              ml='auto'
              w='32px'
              h='32px'
              onClick={onClose}
              fontSize='20px'
              bg='red.600'
            >
              <FaTimes color={theme.colors.white} />
            </Center>
          </HStack>
        </ModalHeader>
        <ModalBody textAlign='center'>
          <Heading as='h2' size='2xl' fontWeight='bold'>
            {task.title}
          </Heading>
          <Text color='gray.400'>{task.description}</Text>
        </ModalBody>
        <Box p='6'>
          <Progress colorScheme='purple' value={task.completed ? 100 : 25} />
          <Text color='green.200' mt='3'>
            07 March 2023
          </Text>
        </Box>
        <ModalFooter flexDirection='column'></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
