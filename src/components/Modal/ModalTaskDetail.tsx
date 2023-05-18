import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Center,
  Box,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { FaCheck, FaExclamation, FaTimes, FaTrash } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { TasksContext, iTask } from '../../contexts/TaskContexts';
import { useContext } from 'react';

interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: iTask;
}

export const ModalTaskDetail = ({ isOpen, onClose, task }: ModalTaskDetailProps) => {
  const { updateTask, deleteTask } = useContext(TasksContext)
  const token: string | null = localStorage.getItem('@to-do:Token');
  const userId: string | null = localStorage.getItem('@to-do:UserId');

  function handleDeleteTask() {
    if(token) {
      deleteTask(id, token);
    }else{
      throw new Error('Token not found');
    }
  }
  
  function handleUpdateTask() {
    if(token && userId) {
      updateTask(id, userId, token);
    }else{
      throw new Error('Token not found');
    }
  }
  
    return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display='flex'>
          <Center bg='purple.500' mr='1' w='30px' h='30px' border-borderRadius='5px'>
            <FaExclamation color={theme.colors.white} size={20} />
          </Center>
          <Text fontWeight='bold' ml='2'>
            Yeess...
          </Text>
          <HStack spacing='2'>
          <Center
              as='button'
              ml='auto'
              w='32px'
              h='32px'
              onClick={onClose}
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
              onClick={onClose}
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

            </Heading>
          <Text>{task.description}</Text>
        </ModalBody>
        <ModalFooter flexDirection='column'></ModalFooter>
      </ModalContent>
    </Modal>
  );
};
