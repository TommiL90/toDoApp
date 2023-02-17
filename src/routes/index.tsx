
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/Loginpage'
import { Register } from '../pages/RegisterPage'


export const RoutesApp = () => 
  (
   <Routes>
      
          {/* <Route element={ <ProtectedRoutes/> }>
              <Route path="/" element={ <Navigate to="/home"/>}/>
              <Route path="/home" element={ <DashBoard/> } />
              <Route path="*" element={ <Navigate to="/home"/> } /> 
          </Route>
  
          */}
                  <Route path="/login" element={ <LoginPage/> } />
                  <Route path="/register" element={ <Register/> } /> 
    
   </Routes >
  )


