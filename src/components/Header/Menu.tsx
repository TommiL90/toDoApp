import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';
import { theme } from '../../styles/theme';
import { FiLogOut } from 'react-icons/fi';

interface iMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: iMenuProps) => {
  return (
    <Drawer placement='top' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay mt='80px' />
      <DrawerContent mr='2em' ml='auto' mt='55px' w={['450px', '360px']}>
        <DrawerHeader borderBottomWidth='1px' color={theme.colors.gray300}>
          Basic Drawer
        </DrawerHeader>
        <DrawerBody display='flex' alignItems='center' gap='1rem'>
          <Button
            bgColor={theme.colors.error}
            _hover={{
              opacity: '0.8',
              cursor: 'pointer',
            }}
          >
            <FiLogOut color={theme.colors.gray100} width='60px' />
          </Button>
          <Box justifyContent='flex-start'>
            <Heading as='h4' fontSize='h4'>
              Sair da minha conta
            </Heading>
            <Text fontSize='t3' color={theme.colors.gray300}>
              Sair da minha conta agora
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Menu;
