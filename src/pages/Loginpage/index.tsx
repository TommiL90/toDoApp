import { Box, Button, Flex, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import logoPrimary from '../../assets/logoPrimary.svg';
import { StyledInput } from '../../components/Input';
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { motion } from 'framer-motion';

export const Login = () => {
  return (
    <Flex 
  
     w='100%'
     minHeight='100vh'
     maxHeight='max-content'
     bgGradient={[
        'linear(to-b, primary 50%, gray100 50%)',
        'linear(to-b, primary 50%, gray100 50%)',
        'linear(to-r, primary 65%, gray100 35%)',
        'linear(to-r, primary 65%, gray100 35%)'
    ]}

    >
      <Box 
      w='100%' 
      maxW={1280} 
      marginX='auto' 
      p='1rem'>
        <Flex 
        flexDirection={['column', 'column', 'row', 'row']}
        w='100%' 
        h='100%' 
        justifyContent={['flex-start', 'flex-start', 'space-between', 'space-between']} alignItems='center'
        gap='1rem' 
        pl={['0', '0', '8', '8']} 
        pr={['0', '0', '130px', '130px']}>
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
                <Heading as='h1' mb='3'>O jeito fácil, grátis</Heading>
                <Text>flexível e atrativo de gerenciar <strong>seus projetos</strong> em uma única plataforma</Text>
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
            p='2rem 1rem' 
            w={['100%', '100%', '510px', '510px']} 
            border='3px solid' borderColor='gray200' borderRadius='8px' 
            bg='gray100'
            >
                <Heading as='h2' mb='1rem'>Bem vindo de volta!</Heading>
                <VStack spacing='4'>
                    <StyledInput name='mail' icon={FaEnvelope} placeholder='Digite sua senha'  />
                    <StyledInput  name='password'icon={FaLock} placeholder='Digite seu password'/>
                    <Button w='100%' color='gray200' bg='primary' h='60px' _hover={{bg:'primaryHover'}}>Entrar</Button>
                    <Text textAlign='center' color='gray400' fontSize='t2'>Ainda não possui uma conta?</Text>
                    <Button w='100%' color='gray400' bg='gray200' h='60px' _hover={{bg:'gray300', color:'primaryHover'}}>Cadastre-se</Button>                
                </VStack>
            </Box>
          </motion.div>
        </Flex>
      </Box>
    </Flex>
  );
};

