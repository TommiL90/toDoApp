import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LoginPage from '../pages/Loginpage';
import SingUpPage from '../pages/SIngUpPage';
import { TasksProvider } from '../contexts/TaskContexts';

export const RoutesApp = () => (
  <Routes>
    {/* <Route element={ <ProtectedRoutes/> }>
              <Route path="/" element={ <Navigate to="/home"/>}/>
              <Route path="/home" element={ <DashBoard/> } />
              <Route path="*" element={ <Navigate to="/home"/> } /> 
          </Route>
  
          */}
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<SingUpPage />} />
    <Route
      path='/home'
      element={
        <TasksProvider>
          <Dashboard />
        </TasksProvider>
      }
    />
  </Routes>
);
