import { Box, Button, Center, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { FaArrowLeft, FaEnvelope, FaForward, FaLock, FaUserAlt } from 'react-icons/fa';
import { StyledInput } from '../../components/Input';
import { singUpSchema } from './schema';
import logoPrimary from '../../assets/logoPrimary.svg';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';
import { ModalSuccess } from '../../components/Modal/ModalSucces';
import { ModalError } from '../../components/Modal/ModalError';
import { useNavigate } from 'react-router-dom';

interface iFormSingUp {
  name: string;
  email: string;
  password: string;
  repeatPassword?: string;
}

const SingUpPage = () => {
  const {
    loading,
    registerUser,
    isModalSuccessOpen,
    onModalSuccessClose,
    isModalErrorOpen,
    onModalErrorClose,
  } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iFormSingUp>({
    resolver: yupResolver(singUpSchema),
  });

  const submit: SubmitHandler<iFormSingUp> = ({ name, email, password }) => {
    console.log({ name, email, password });
    registerUser({ name, email, password });
    reset();
  };

  const navigate = useNavigate();

  return (
    <>
      <ModalSuccess
        buttonMessage='Ir para o login agora'
        message='Cadastro realizado com sucesso!'
        onClick={() => {
          navigate('/login');
        }}
        secondaryText='Você já pode começar <b>criando</> suas listas de tarefa agora mesmo'
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
      />
      <ModalError
        error='Email já cadastrado'
        isOpen={isModalErrorOpen}
        onClose={onModalErrorClose}
      />
      <Flex
        w='100%'
        h={['auto', 'auto', '100vh', '100vh']}
        bgGradient={[
          'linear(to-b, primary 50%, gray100 50%)',
          'linear(to-b, primary 50%, gray100 50%)',
          'linear(to-l, primary 65%, gray100 35%)',
          'linear(to-l, primary 65%, gray100 35%)',
        ]}
      >
        <Button
          position='absolute'
          top={['2.2rem', '2.2rem', '4.4rem']}
          left={['75vw', '87vw', '3rem', '3rem']}
          bg='secondary'
          _hover={{
            bg: 'secondaryHover',
          }}
          w={['60px', '60px', '80px', '80px']}
          h={['50px', '50px', '70px', '70px']}
          onClick={() => {navigate('/login')}}
        >
          <FaArrowLeft color={theme.colors.gray100} size='25' />
        </Button>
        <Box w='100%' maxW={1280} marginX='auto' p='1rem'>
          <Flex
            flexDirection={['column', 'column', 'row-reverse', 'row-reverse']}
            w='100%'
            h='100%'
            justifyContent={['revert', 'flex-start', 'space-between', 'space-between']}
            alignItems='center'
            gap='1rem'
            pr={['0', '0', '8', '8']}
            pl={['0', '0', '130px', '130px']}
          >
            <Box
              color='white'
              w={['100%', '100%', '335px', '335px']}
              mb={['2rem', '2rem', '0', '0']}
            >
              <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -10, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Image src={logoPrimary} alt='logo' boxSize={120} />
                <VStack spacing='6'>
                  <Flex>
                    <Center borderRadius='5px' bg='white' w='50px' h='50px'>
                      <FaForward color={theme.colors.primary} size='25' />
                    </Center>
                    <Box ml='4'>
                      <Heading as='h4' fontSize='h4'>
                        Agilidade
                      </Heading>
                      <Text>
                        Agilize seus projetos com rapidez <br /> e muito performance
                      </Text>
                    </Box>
                  </Flex>
                  <Flex>
                    <Center borderRadius='5px' bg='white' w='50px' h='50px'>
                      <FaForward color={theme.colors.primary} size='25' />
                    </Center>
                    <Box ml='4'>
                      <Heading as='h4' fontSize='h4'>
                        Simplicidade
                      </Heading>
                      <Text>
                        Armazene seus projetos em uma <br /> interfce altamente usual
                      </Text>
                    </Box>
                  </Flex>
                </VStack>
              </motion.div>
            </Box>
            <Box
              as='form'
              onSubmit={handleSubmit(submit)}
              p='2rem 1rem'
              w={['100%', '100%', '510px', '510px']}
              border='3px solid'
              borderColor='gray200'
              borderRadius='8px'
              bg='gray100'
            >
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 10, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Heading as='h1' fontSize='h1' mb='1rem'>
                  Crie sua conta
                </Heading>
                <VStack spacing='4'>
                  <StyledInput
                    label='Nome'
                    icon={FaUserAlt}
                    placeholder='Digite sua senha'
                    {...register('name')}
                    error={errors.name}
                  />
                  <StyledInput
                    label='Email'
                    icon={FaEnvelope}
                    placeholder='Digite sua senha'
                    {...register('email')}
                    error={errors.email}
                  />
                  <StyledInput
                    label='Senha'
                    icon={FaLock}
                    placeholder='Digite sua senha'
                    {...register('password')}
                    error={errors.password}
                  />
                  <StyledInput
                    label='Repita Senha'
                    icon={FaLock}
                    placeholder='Digite sua senha'
                    {...register('repeatPassword')}
                    error={errors.repeatPassword}
                  />
                  <Button
                    isLoading={loading}
                    type='submit'
                    w='100%'
                    color='gray200'
                    bg='primary'
                    h='60px'
                    _hover={{ bg: 'primaryHover' }}
                  >
                    Finalizar cadastro
                  </Button>
                </VStack>
              </motion.div>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default SingUpPage;
