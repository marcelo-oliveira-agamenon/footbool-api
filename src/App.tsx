import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { context as Context } from 'context';
import Login from 'pages/login';
import Home from 'pages/home';
import Clubs from 'pages/clubs';
import Club from 'pages/club';
import Loader from 'components/loader';

interface IProtectedRoute {
  token: string;
  children: JSX.Element;
}

const ProtectedRoute = ({ token, children }: IProtectedRoute) => {
  const location = useLocation();

  useEffect(() => {
    console.log('aaa ', location);
  }, [location]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const tokenKey = localStorage.getItem('token_key') as string;

  return (
    <div className="bg-orange-200 w-full min-h-screen">
      {showLoader ? <Loader /> : null}

      <Context.Provider
        value={{
          showLoader,
          setShowLoader,
        }}
      >
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
      </Context.Provider>
    </div>
  );
}

export default App;
