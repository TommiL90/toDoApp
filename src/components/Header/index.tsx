import { Flex, Heading, Image, useDisclosure } from '@chakra-ui/react';
import { FaTh } from 'react-icons/fa';
import logo from '../../assets/Icon.svg';
import { theme } from '../../styles/theme';
import Menu from './Menu';

const Header = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  return (
    <Flex
      h='85px'
      w='100%'
      align='center'
      maxW={1280}
      marginX='auto'
      p='1rem'
      borderBottom='1px'
      borderBottomColor='gray200'
      justifyContent='space-between'
    >
      <Flex alignItems='center'>
        <Image src={logo} w='60px' />
        <Heading as='h4' fontSize='h4' ml='2'>
          DashBoard
        </Heading>
      </Flex>
      <FaTh color={theme.colors.gray300} size='1.5rem' cursor='pointer' onClick={onToggle} />
      <Menu isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default Header;
