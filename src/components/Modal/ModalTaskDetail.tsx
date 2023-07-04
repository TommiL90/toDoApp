import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  Center,
  Box,
  Heading,
  Flex,
  Progress,
} from '@chakra-ui/react';
import { FaCube, FaTimes } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { iTask } from '../../contexts/TaskContexts';


interface ModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: iTask;
}

export const ModalTaskDetail = ({ isOpen, onClose, task }: ModalTaskDetailProps) => {
  const createdAtDate = new Date(task.createdAt);
  const updatedAtDate = new Date(task.updatedAt);


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
        </ModalHeader>
        <ModalBody
          textAlign='center'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          gap='4'
        >
          <Heading as='h2' size='2xl' fontWeight='bold'>
            {task.title}
          </Heading>
          <Text color='gray.400'>{task.description}</Text>
        </ModalBody>
        <Box p='6'>
          <Progress colorScheme='purple' value={task.completed ? 100 : 25} />
          <Text color='gray.300' mt='4'>
            {task.completed === false
              ? `Criado em ${createdAtDate.toLocaleDateString()}`
              : `Completado em ${updatedAtDate.toLocaleDateString()}`}
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
