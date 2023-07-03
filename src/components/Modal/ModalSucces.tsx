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
} from '@chakra-ui/react';
import { FaExclamation } from 'react-icons/fa';
import { theme } from '../../styles/theme';

interface ModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  buttonMessage: string;
  onClick: () => void;
  secondaryText: string;
}

export const ModalSuccess = ({
  isOpen,
  onClose,
  message,
  buttonMessage,
  onClick,
  secondaryText,
}: ModalSuccessProps) => (
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
      </ModalHeader>
      <ModalCloseButton bg='red.600' color='white' _hover={{ bg: 'red.700' }} />
      <ModalBody textAlign='center'>
        <Text>
          <Box dangerouslySetInnerHTML={{ __html: message }} />
        </Text>
      </ModalBody>
      <ModalFooter flexDirection='column'>
        <Button
          bg='purple.500'
          color='white'
          w='100%'
          _hover={{ bg: 'purple.600' }}
          onClick={onClick}
        >
          {buttonMessage}
        </Button>
        <Text mt='4' color='gray.600'>
          <Box dangerouslySetInnerHTML={{ __html: secondaryText }} />
        </Text>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
