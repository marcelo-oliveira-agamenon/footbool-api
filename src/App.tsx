import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from 'pages/login';
import Home from 'pages/home';
import Clubs from 'pages/clubs';
import Club from 'pages/club';

interface IProtectedRoute {
  token: string;
  children: JSX.Element;
}

const ProtectedRoute = ({ token, children }: IProtectedRoute) => {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const tokenKey = localStorage.getItem('token_key') as string;

  return (
    <div className="bg-orange-200 w-full min-h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute token={tokenKey}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/club"
            element={
              <ProtectedRoute token={tokenKey}>
                <Clubs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/club/:id"
            element={
              <ProtectedRoute token={tokenKey}>
                <Club />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
