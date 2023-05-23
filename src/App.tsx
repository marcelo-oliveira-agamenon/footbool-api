import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';

function App() {
  return (
    <div className="w-full h-screen">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
