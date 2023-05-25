import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Clubs from './pages/clubs';
import Club from './pages/club';

function App() {
  return (
    <div className="bg-orange-200 w-full h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/club" element={<Clubs />} />
          <Route path="/club/:id" element={<Club />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
