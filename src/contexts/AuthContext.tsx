import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services';
import { iChildrenProps, iDataLogin, iAuthContext, iDataRegister, iUserProps } from './types';
import { useDisclosure } from '@chakra-ui/react';

export const AuthContext = createContext({} as iAuthContext);

export const AuthProvider = ({ children }: iChildrenProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const [user, setUser] = useState({} as iUserProps);
  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccesOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorClose,
  } = useDisclosure();

  useEffect(() => {
    const token = localStorage.getItem('@to-do:Token')

    if(!token) {
      setIsAuth(false)
      return
    }

    // api.defaults.headers.common.authorization = `Bearer ${token}`
    setIsAuth(false)
  }, [])

  const loginUser = useCallback(async (data: iDataLogin) => {
    try {
      setLoading(true);

      const response = await api.post('/login', data);
      const token = response.data.accessToken;
      const userId = response.data.user.id;


      setUser(response.data.user);
      localStorage.setItem('@to-do:Token', token);
      localStorage.setItem('@to-do:Id', userId);

      navigate('/home');

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerUser = useCallback(async (data: iDataRegister) => {
    try {
      setLoading(true);

      await api.post('/register', data);
      onModalSuccesOpen();
    } catch (error) {
      console.log(error);
      onModalErrorOpen();
    }finally{
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        loading,
        registerUser,
        isModalSuccessOpen,
        onModalSuccessClose,
        isModalErrorOpen,
        onModalErrorClose,
        user,
        isAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
