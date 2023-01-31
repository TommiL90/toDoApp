import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons/lib';

interface iInput extends ChakraProps {
  name: string;
  label?: string;
  icon?: IconType;
  error?: FieldError;
  register?: UseFormRegisterReturn;
  placeholder?: string;
}

type iVaration = {
  [key: string]: string;
};

const inputVariation: iVaration = {
  error: 'error',
  default: 'gray200',
  focus: 'primary',
  filled: 'sucess',
};

export const StyledInput = ({ name, label, icon: Icon, error, register, ...rest }: iInput) => {
  const [variation, setVaration] = useState('default');

   const inputRef = useRef<HTMLInputElement>(null)

    useEffect(()=> {
        if(error) {
            return setVaration('error')
        }
    }, [error])

    const handleInputFocus = useCallback(
      () => {
        if(!error){
            return setVaration('focus')
        }
      },
      [error],
    )

    const handleInputBlur = useCallback(
        () => {
          if(inputRef.current?.value && !error){
              return setVaration('filled')
          }
        },
        [error],
      )
    

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup flexDirection='column'>
        {Icon && (
          <InputLeftElement 
          mt='2.5'
          color={inputVariation[variation]}>
            <Icon />
          </InputLeftElement>
        )}
        <Input
          type={name}
          {...register}
          {...rest}
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          variant='outline'
          _hover={{ bgColor: 'gray200' }}
          _placeholder={{ color: 'gray400' }}
          h='60px'
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};
