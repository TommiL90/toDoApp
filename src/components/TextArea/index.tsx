import {
  ChakraProps,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import {
  useState,
  useEffect,
  useCallback,
  ForwardRefRenderFunction,
  forwardRef,
} from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { IconType } from 'react-icons/lib';

interface iInput extends ChakraProps {
  name: string;
  label?: string;
  icon?: IconType;
  error?: FieldError | null;
  register?: UseFormRegisterReturn;
  placeholder?: string;
}

type tVaration = {
  [key: string]: string;
};

const inputVariation: tVaration = {
  error: 'error',
  default: 'gray300',
  focus: 'primary',
  filled: 'sucess',
};

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, iInput> = (
  { name, label, icon: Icon, error = null,...rest },
  ref,
) => {
  const [variation, setVaration] = useState('default');
  const [value, setValue] = useState('');

  // const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (error) {
      return setVaration('error');
    }
  }, [error]);

  const handleInputFocus = useCallback(() => {
    if (!error) {
      return setVaration('focus');
    }
  }, [error]);

  const handleInputBlur = useCallback(() => {
    if (value.length > 1 && !error) {
      return setVaration('filled');
    }
  }, [error]);

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel color='gray300' fontSize='t2' fontWeight='400'>{label}</FormLabel>}
      <InputGroup flexDirection='column'>
        {Icon && (
          <InputLeftElement mt='2.5' color={inputVariation[variation]}>
            <Icon />
          </InputLeftElement>
        )}
        <Textarea
          name={name}
          ref={ref}
          onChangeCapture={e => setValue(e.currentTarget.value)}
          onFocus={handleInputFocus}
          onBlurCapture={handleInputBlur}
          color={inputVariation[variation]}
          borderColor={inputVariation[variation]}
          variant='outline'
          _hover={{ bgColor: 'gray200' }}
          _placeholder={{ color: 'gray400' }}
          h='60px'
          {...rest}
        />
        {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </InputGroup>
    </FormControl>
  );
};

export const StyledTextArea = forwardRef(TextAreaBase);
