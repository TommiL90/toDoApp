import { AuthProvider } from './contexts/AuthContext';
import { RoutesApp } from './routes';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <RoutesApp />
      </AuthProvider>
    </div>
  );
}

export default App;
