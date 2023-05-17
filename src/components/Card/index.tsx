import { Box, Button, Flex, Heading, HStack, Progress, Text, VStack } from '@chakra-ui/react';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { theme } from '../../styles/theme';

function Card() {
  return (
    <Box
      cursor='pointer'
      _hover={{
        transform: 'translateY(-7px)',
        borderColor: theme.colors.gray200,
      }}
      transition='border 0.2s. ease 0.1s. transform 0.2s'
      boxShadow='base'
      p='8'
      w={['330px', 'auto']}
    >
      <Flex justify='space-between'>
        <Heading as='h3' fontSize='h3'>
          Title Test
        </Heading>
        <HStack spacing='4'>
          <Button border='1px' borderColor='gray200' bgColor='gray100'>
            <FaTrash fontSize='1rem' color={theme.colors.gray300} />
          </Button>
          <Button border='1px' borderColor='gray200' bgColor='gray100'>
            <FaCheck fontSize='1rem' color={theme.colors.gray300} />
          </Button>
        </HStack>
      </Flex>
      <Flex flexDirection='column' gap='1rem'>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>
        <Progress colorScheme='purple' mt='1rem' value={15} />
        <Text color='gray.300'>21-02-2021</Text>
      </Flex>
    </Box>
  );
}

export default Card;
