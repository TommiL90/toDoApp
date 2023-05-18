import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { theme } from '../../../styles/theme';
import { StyledInput } from '../../Input';
import { StyledTextArea } from '../../TextArea';
import { newTaskSchema } from './schema';
import { useContext } from 'react';
import { TasksContext } from '../../../contexts/TaskContexts';
import { AuthContext } from '../../../contexts/AuthContext';

interface iModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

interface iNewTask {
  title: string;
  description: string;
}


const ModalCreateTask = ({ isOpen, onClose }: iModalCreateTaskProps) => {
  const { createTask } = useContext(TasksContext)
  const { user } = useContext(AuthContext)
  const token: string | null = localStorage.getItem('@to-do:Token')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iNewTask>({
    resolver: yupResolver(newTaskSchema),
  });

  const submit: SubmitHandler<iNewTask> = (data) => {
    console.log(data);
    const newData = {...data, userId: user.id,  completed: false}
    if (token) {
      createTask(newData, token);
      reset();
    }else{
      throw new Error('Token não encontrado')
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader as='h4' fontSize='h4' display='flex' alignItems='center' gap='2'>
            <Center bgColor={theme.colors.secondary} w='30px' h='30px' borderRadius='5px'>
              <HiOutlineDocumentText color={theme.colors.gray100} size='1.2rem' />
            </Center>
            Adicionar
          </ModalHeader>
          <ModalCloseButton
            color={theme.colors.gray100}
            bgColor={theme.colors.error}
            fontSize='12px'
            w='30px'
            h='30px'
            mt='1'
            _hover={{
              opacity: 0.8,
            }}
          />
          <ModalBody as='form' pb={6} onSubmit={handleSubmit(submit)}>
            <VStack spacing='4'>
              <StyledInput
                label='Título'
                placeholder='Digite seu título'
                {...register('title')}
                error={errors.title}
              />

              <StyledTextArea
                label='Descrição'
                placeholder='Digite sua descrição...'
                {...register('description')}
                error={errors.description}
              />
              <Button
                isLoading={false}
                type='submit'
                w='100%'
                color='gray100'
                bg='secondary'
                h='60px'
                _hover={{ bg: 'secondaryHover' }}
              >
                Adicionar Tarefa
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCreateTask;
