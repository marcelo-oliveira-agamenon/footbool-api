import { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import Header from '../../components/header';
import { Team as ITeam } from '../../interfaces/api';
import Team from '../../components/team';

export default function Clubs() {
  const [clubs, setClubs] = useState<Array<ITeam>>([]);

  const getClubs = useCallback(async () => {
    const league = localStorage.getItem('league_code') as string;
    const season = localStorage.getItem('season') as string;
    const tokenKey = localStorage.getItem('token_key') as string;
    const url = new URLSearchParams({
      league,
      season,
    });

    await api
      .get('/teams?' + url.toString(), {
        headers: {
          'x-apisports-key': tokenKey,
        },
      })
      .then((response) => {
        setClubs(response.data.response);
      });
  }, []);

  useEffect(() => {
    getClubs();
  }, [getClubs]);

  return (
    <div>
      <Header />

      <section className="flex flex-wrap gap-3 p-2">
        {clubs && clubs.length !== 0 ? (
          clubs.map((club) => <Team {...club} />)
        ) : (
          <div className="w-full text-center mt-12">
            <h3 className="text-xl">Não há clubes nesta temporada ou liga!</h3>
          </div>
        )}
      </section>
    </div>
  );
}
