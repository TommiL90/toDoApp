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
} from '@chakra-ui/react';
import { FaExclamation } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface ModalErrorProps {
  isOpen: boolean;
  onClose: () => void;
  error: string;
}

export const ModalError = ({ isOpen, onClose, error }: ModalErrorProps) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent color='gray.800'>
      <ModalHeader display='flex'>
        <Center bg='red.600' mr='1' w='30px' h='30px' border-borderRadius='5px'>
          <FaExclamation color={theme.colors.white} size={20} />
        </Center>
        <Text fontWeight='bold' ml='2'>
          Oopss!!!
        </Text>
      </ModalHeader>
      <ModalCloseButton bg='red.600' color='white' _hover={{ bg: 'red.700' }} />
      <ModalBody textAlign='center'>
        <Text>
          Ocorreu algum erro!!! <strong>{error}</strong>{' '}
        </Text>
      </ModalBody>
      <ModalFooter color='gray.400' display='column'>
        <Button
          bg='red.600'
          color='white'
          w='100%'
          _hover={{ bg: 'red.700' }}
          mr={3}
          onClick={onClose}
        >
          Tentar novamente
        </Button>
        <Text mt='4' textAlign='center'>
          Você já pode tentar novamente , <strong>clicando</strong> no botão acima ou aguarde alguns
          minutos ...
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
