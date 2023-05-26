import { useCallback, useEffect, useMemo, useState } from 'react';
import { PieChart, Pie } from 'recharts';
import api from '../../api';
import Header from '../../components/header';
import { Player as IPlayer, TeamStats } from '../../interfaces/api';
import { useParams } from 'react-router-dom';

export default function Club() {
  const { id } = useParams();
  const [availablePlayers, setAvailablePlayers] = useState<Array<IPlayer>>([]);
  const [clubInfo, setClubInfo] = useState<TeamStats>();
  const [page, setPage] = useState(1);
  const season = localStorage.getItem('season') as string;
  const tokenKey = localStorage.getItem('token_key') as string;
  const league = localStorage.getItem('league_code') as string;

  const getClubStats = useCallback(async () => {
    const url = new URLSearchParams({
      team: id || '',
      season,
      league,
    });

    await api
      .get('/teams/statistics?' + url.toString(), {
        headers: {
          'x-apisports-key': tokenKey,
        },
      })
      .then((response) => {
        setClubInfo(response.data.response);
      });
  }, [league, season, id, tokenKey]);

  const getClubInfo = useCallback(async () => {
    const url = new URLSearchParams({
      team: id || '',
      season,
      page: page.toString(), // check scroll to fetch another page
    });

    await api
      .get('/players?' + url.toString(), {
        headers: {
          'x-apisports-key': tokenKey,
        },
      })
      .then((response) => {
        setAvailablePlayers(response.data.response);
      });
  }, [page, id, tokenKey, season]);

  useEffect(() => {
    getClubInfo();
  }, [getClubInfo]);

  useEffect(() => {
    getClubStats();
  }, [getClubStats]);

  const returnGraphFormat = useMemo(() => {
    const auxGoals = clubInfo ? Object.entries(clubInfo.goals.for.minute) : [];

    return auxGoals.map((goal) => {
      return {
        name: goal[0],
        value: goal[1].total,
      };
    });
  }, [clubInfo]);

  return (
    <div>
      <Header />

      <div>
        <section>
          <table>
            <thead>
              <tr>
                <th>Name</th>

                <th>Age</th>

                <th>Nationality</th>
              </tr>
            </thead>

            <tbody>
              {availablePlayers && availablePlayers.length !== 0 ? (
                availablePlayers.map((player) => {
                  const { age, name, nationality, id } = player.player;

                  return (
                    <tr key={id}>
                      <td>{name}</td>

                      <td>{age}</td>

                      <td>{nationality}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>Não há jogadores disponíveis para este clube</tr>
              )}
            </tbody>
          </table>
        </section>

        <section>
          <table>
            <thead>
              <tr>
                <th>Formações</th>

                <th>Jogos</th>
              </tr>
            </thead>

            <tbody>
              {clubInfo ? (
                clubInfo.lineups.map((form) => (
                  <tr>
                    <td>{form.formation}</td>

                    <td>{form.played}</td>
                  </tr>
                ))
              ) : (
                <tr>Não há formações disponíveis para este clube</tr>
              )}
            </tbody>
          </table>
        </section>
      </div>

      <div>
        <section>
          <table>
            <thead>
              <tr>
                <th>Total de jogos</th>

                <th>Total de vitórias</th>

                <th>Total de derrotas</th>

                <th>Total de empates</th>
              </tr>
            </thead>

            <tbody>
              {clubInfo ? (
                <tr>
                  <td>{clubInfo.fixtures.played.total}</td>

                  <td>{clubInfo.fixtures.wins.total}</td>

                  <td>{clubInfo.fixtures.loses.total}</td>

                  <td>{clubInfo.fixtures.draws.total}</td>
                </tr>
              ) : (
                <tr>Não há resultados disponíveis para este clube</tr>
              )}
            </tbody>
          </table>
        </section>

        <section>
          <h3>Gols marcados por tempo de jogo</h3>

          <PieChart width={400} height={400}>
            <Pie
              data={returnGraphFormat}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
          </PieChart>
        </section>
      </div>
    </div>
  );
}
