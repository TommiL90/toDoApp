import { Button, Input, Wrap } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { theme } from '../../styles/theme';

const SearchBox = () => {
  return (
    <Wrap
      as='form'
      w='100%'
      align='center'
      maxW={1280}
      marginX='auto'
      p='1rem'
      minH='100px'
      h='max-content'
      borderBottom='1px'
      borderBottomColor={theme.colors.gray200}
    >
      <Input
        w='80%'
        maxW='574px'
        h='60px'
        variant='outline'
        _focus={{
          borderColor: 'primary',
        }}
      />
      <Button
        width='15%'
        maxW='65px'
        h='60px'
        bgColor='secondary'
        _hover={{
          bgColor: theme.colors.secondaryHover,
        }}
      >
        <FaSearch fontSize='1.1rem' color={theme.colors.gray100} />
      </Button>
      <Button
        width={['100%', '100%', '288px', '288px']}
        h='60px'
        color='gray100'
        bgColor='secondary'
        _hover={{
          bgColor: theme.colors.secondaryHover,
        }}
      >
        Adicionar nova tarefa
      </Button>
    </Wrap>
  );
};

export default SearchBox;
