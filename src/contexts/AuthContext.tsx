import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services';
import { iChildrenProps, iDataLogin, iAuthContext, iDataRegister, iUserProps } from './types';
import { useDisclosure } from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';

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

  useEffect( () => {
    const token = localStorage.getItem('@to-do:Token');
    const userId = localStorage.getItem('@to-do:Id');

    if (!token) {
      setIsAuth(false);
      return;
    }

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    const retrieveUser = async () => {
      try {
        const res = await api.get<iUserProps>(`/users/${userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        navigate('/login');
      }
    }
    retrieveUser()

    setIsAuth(false);
  }, []);

  const loginUser = useCallback(async (data: iDataLogin) => {
    try {
      setLoading(true);

      const response = await api.post('/login', data);
      const { sub } = jwtDecode(response.data.token) as { sub: string };

      const token: string = response.data.token;
      const userId: string = sub;

      api.defaults.headers.common.authorization = `Bearer ${token}`;
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

      await api.post('/users', data);
      onModalSuccesOpen();
    } catch (error) {
      console.log(error);
      onModalErrorOpen();
    } finally {
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
        isAuth,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
