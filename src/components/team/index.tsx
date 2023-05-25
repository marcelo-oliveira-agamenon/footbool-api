import { useNavigate } from 'react-router-dom';
import { Team as ITeam } from '../../interfaces/api';

export default function Team({ team }: ITeam) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/club/${team.id}`)}>
      <h2>{team.name}</h2>

      <img src={team.logo} alt={team.name} />
    </div>
  );
}
