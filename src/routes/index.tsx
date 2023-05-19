import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/Loginpage';
import SingUpPage from '../pages/SIngUpPage';
import { TasksProvider } from '../contexts/TaskContexts';
import { ProtectedRoutes } from './ProtectedRoutes';

export const RoutesApp = () => (
  <Routes>
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<SingUpPage />} />
    <Route element={<ProtectedRoutes />}>
      <Route
        path='/home'
        element={
          <TasksProvider>
            <Dashboard />
          </TasksProvider>
        }
      />
      <Route path='*' element={<Navigate to='/home' />} />
      <Route path='/' element={<Navigate to='/home' />} />
    </Route>
  </Routes>
);
