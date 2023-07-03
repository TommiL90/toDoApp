import { Box, Button, Flex, Heading, Image, Text, VStack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types/form';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { StyledInput } from '../../components/Input';
import { signInSchema } from './schema';
import logoPrimary from '../../assets/logoPrimary.svg';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { theme } from '../../styles/theme';
import { useNavigate } from 'react-router-dom';

interface iFormLogin {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { loading, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<iFormLogin>({
    resolver: yupResolver(signInSchema),
  });

  const submit: SubmitHandler<iFormLogin> = (data) => {
    loginUser(data);
    reset();
  };

  return (
    <Flex
      w='100%'
      h={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, primary 50%, gray100 50%)',
        'linear(to-b, primary 50%, gray100 50%)',
        'linear(to-r, primary 65%, gray100 35%)',
        'linear(to-r, primary 65%, gray100 35%)',
      ]}
    >
      <Box w='100%' maxW={1280} marginX='auto' p='1rem'>
        <Flex
          flexDirection={['column', 'column', 'row', 'row']}
          w='100%'
          h='100%'
          justifyContent={['flex-start', 'flex-start', 'space-between', 'space-between']}
          alignItems='center'
          gap='1rem'
          pl={['0', '0', '8', '8']}
          pr={['0', '0', '130px', '130px']}
        >
          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Box
              color='white'
              w={['100%', '100%', '335px', '335px']}
              mb={['2rem', '2rem', '0', '0']}
            >
              <Image src={logoPrimary} alt='logo' boxSize={120} />
              <Heading as='h1' mb='3'>
                O jeito fácil, grátis
              </Heading>
              <Text>
                flexível e atrativo de gerenciar <strong>seus projetos</strong> em uma única
                plataforma
              </Text>
            </Box>
          </motion.div>
          <motion.div
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
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
              <Heading as='h1' fontSize='h1' mb='1rem'>
                Bem vindo de volta!
              </Heading>
              <VStack spacing='4'>
                <Box w='100%'>
                  <StyledInput
                    label='Email'
                    icon={FaEnvelope}
                    placeholder='Digite seu Email'
                    {...register('email')}
                    error={errors.email}
                  />
                  {!errors.email && (
                    <Text ml='1' mt='1' fontSize='t3' color='gray300'>
                      Exemplo: nome@mail.com
                    </Text>
                  )}
                </Box>
                <StyledInput
                  label='Senha'
                  icon={FaLock}
                  placeholder='Digite sua senha'
                  {...register('password')}
                  error={errors.password}
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
                  Entrar
                </Button>
                <Text textAlign='center' color='gray400' fontSize='t2'>
                  Ainda não possui uma conta?
                </Text>
                <Button
                  w='100%'
                  color='gray400'
                  bg={theme.colors.gray200}
                  h='60px'
                  _hover={{ bg: 'gray300', color: 'primaryHover' }}
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Cadastre-se
                </Button>
              </VStack>
            </Box>
          </motion.div>
        </Flex>
      </Box>
    </Flex>
  );
};

export default LoginPage;
