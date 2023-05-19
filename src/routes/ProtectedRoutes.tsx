import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Box, SkeletonCircle, SkeletonText } from '@chakra-ui/react';

export const ProtectedRoutes = () => {
  const { isAuth } = useContext(AuthContext);

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

  return <Outlet />;
};
