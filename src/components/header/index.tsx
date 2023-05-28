import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('season');
    localStorage.removeItem('token_key');
    localStorage.removeItem('league_code');
    localStorage.removeItem('country_code');
    navigate('/');
  };

  return (
    <div className="bg-blue-200 w-full h-14 flex justify-between items-center px-4">
      <h1>Meu time website</h1>

      <div onClick={handleLogout} className="cursor-pointer">
        <h5>Sair</h5>
      </div>
    </div>
  );
}
