import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services';
import { iChildrenProps, iDataLogin, iAuthContext } from './types';

export const AuthContext = createContext({} as iAuthContext);

export const AuthProvider = ({ children }: iChildrenProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({} as any);

  const loginUser = useCallback(async (data: iDataLogin) => {
    try {
      setLoading(true);

      const response = await api.post('/sessions', data);
      const token = response.data.token;
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

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
