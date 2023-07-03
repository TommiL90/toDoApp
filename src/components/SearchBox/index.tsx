import { Button, Input, useDisclosure, Wrap } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import ModalCreateTask from '../Modal/ModalCreateTask';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useContext } from 'react';
import { TasksContext } from '../../contexts/TaskContexts';

interface iSearchData {
  title: string;
}

const SearchBox = (): JSX.Element => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { searchtask } = useContext(TasksContext);
  const token: string | null = localStorage.getItem('@to-do:Token');

  const { register, handleSubmit } = useForm<iSearchData>();

  const submit: SubmitHandler<iSearchData> = (data) => {
    if (token) {
      searchtask(data.title, token);
    } else {
      throw new Error('Token not found');
    }
  };

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
      onSubmit={handleSubmit(submit)}
    >
      <Input
        w='80%'
        maxW='574px'
        h='60px'
        variant='outline'
        _focus={{
          borderColor: 'primary',
        }}
        placeholder='Pesquisar por Tarefa ...'
        {...register('title')}
      />
      <Button
        width='15%'
        maxW='65px'
        h='60px'
        bgColor='secondary'
        type='submit'
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
        onClick={onOpen}
      >
        Adicionar nova tarefa
      </Button>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
    </Wrap>
  );
};

export default SearchBox;
