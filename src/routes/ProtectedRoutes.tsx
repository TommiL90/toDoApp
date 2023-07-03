import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const ProtectedRoutes = () => {
  const { isAuth } = useContext(AuthContext);
  const token: string | null = localStorage.getItem('@to-do:Token');

  if (isAuth) {
    return (
      <>
        <Box padding='6' boxShadow='lg' bg='white'>
          <SkeletonCircle size='16' />
          <SkeletonText mt='4' noOfLines={5} spacing='4' skeletonHeight='40' />
        </Box>
      </>
    );
  }

  return token ? <Outlet /> : <Navigate to='/login' />;
};
