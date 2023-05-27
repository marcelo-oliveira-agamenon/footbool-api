import { useNavigate } from 'react-router-dom';
import { Team as ITeam } from 'interfaces/api';

export default function Team({ team }: ITeam) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/club/${team.id}`)}
      className="flex bg-indigo-200 justify-between items-center p-2 cursor-pointer w-56 h-28"
    >
      <h2 className="text-xl">{team.name}</h2>

      <img className="h-12 w-12" src={team.logo} alt={team.name} />
    </div>
  );
}
