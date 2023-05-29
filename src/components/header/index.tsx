import { useNavigate } from 'react-router-dom';
import Logo from 'assets/football-illustration-file-sports-design-logo-free-png.webp';

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
      <div className="flex justify-between items-center gap-5">
        <img className="w-12 h-12 mx-auto" src={Logo} alt="meu time icone" />

        <h1 className="text-lg">Meu Time</h1>
      </div>

      <div onClick={handleLogout} className="cursor-pointer">
        <h5>Sair</h5>
      </div>
    </div>
  );
}
