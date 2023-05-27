import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import api from '../../api';
import Header from '../../components/header';
import { Player as IPlayer, TeamStats } from '../../interfaces/api';
import { useParams } from 'react-router-dom';
import Navigation from '../../components/navigation';
import team from '../../mock/team.json';
import player from '../../mock/player.json';

export default function Club() {
  const { id } = useParams();
  const pageRange = useRef(0);
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

    // await api
    //   .get('/teams/statistics?' + url.toString(), {
    //     headers: {
    //       'x-apisports-key': tokenKey,
    //     },
    //   })
    //   .then((response) => {
    //     setClubInfo(response.data.response);
    //   });
    setClubInfo(team as any);
  }, [league, season, id, tokenKey]);

  const getClubInfo = useCallback(async () => {
    const url = new URLSearchParams({
      team: id || '',
      season,
      page: page.toString(),
    });

    // await api
    //   .get('/players?' + url.toString(), {
    //     headers: {
    //       'x-apisports-key': tokenKey,
    //     },
    //   })
    //   .then((response) => {
    //     setAvailablePlayers(response.data.response);
    //     pageRange.current = response.data.paging.total;
    //   });
    setAvailablePlayers(player as any);
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
      const value = goal[1].total === null ? 0 : goal[1].total;

      return {
        name: goal[0],
        value,
      };
    });
  }, [clubInfo]);

  const handleChangePage = (isNext: boolean) => {
    if (isNext && page < pageRange.current) {
      setPage(page + 1);
      return;
    }
    if (isNext === false && page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div>
      <Header />

      <Navigation />

      {clubInfo ? (
        <section className="flex justify-between items-center py-2 px-5 bg-indigo-200 mx-2 rounded-lg my-8">
          <h1 className="text-3xl font-bold">{clubInfo.team.name}</h1>

          <h3 className="text-xl">Liga: {clubInfo.league.name}</h3>

          <h5 className="text-xl">Temporada: {clubInfo.league.season}</h5>

          <img src={clubInfo.team.logo} alt={clubInfo.team.name} />
        </section>
      ) : null}

      <div className="flex justify-between p-2">
        <section className="w-3/5">
          <table className="w-full">
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
                    <tr key={`${id}-${age}`}>
                      <td className="h-10 ">{name}</td>

                      <td className="h-10 text-center">{age}</td>

                      <td className="h-10 text-center">{nationality}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>Não há jogadores disponíveis para este clube</tr>
              )}
            </tbody>
          </table>

          <div className="mt-6 flex justify-center gap-8">
            <button
              className="text-sm"
              type="button"
              onClick={() => handleChangePage(false)}
              disabled={page === 1}
            >
              Anterior
            </button>

            <button
              className="text-sm"
              type="button"
              onClick={() => handleChangePage(true)}
              disabled={page === pageRange.current}
            >
              Próxima
            </button>
          </div>
        </section>

        <section className="w-2/5">
          <table className="w-full">
            <thead>
              <tr>
                <th>Formações</th>

                <th>Jogos</th>
              </tr>
            </thead>

            <tbody>
              {clubInfo ? (
                clubInfo.lineups.map((form, index) => (
                  <tr
                    key={`${index}-${form.formation}`}
                    className="h-10 text-center"
                  >
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

      <div className="p-2 mt-3">
        <section className="w-full flex justify-center">
          <table>
            <thead>
              <tr>
                <th className="px-8">Total de jogos</th>

                <th className="px-8">Total de vitórias</th>

                <th className="px-8">Total de derrotas</th>

                <th className="px-8">Total de empates</th>
              </tr>
            </thead>

            <tbody>
              {clubInfo ? (
                <tr>
                  <td className="h-12 text-center">
                    {clubInfo.fixtures.played.total}
                  </td>

                  <td className="h-12 text-center">
                    {clubInfo.fixtures.wins.total}
                  </td>

                  <td className="h-12 text-center">
                    {clubInfo.fixtures.loses.total}
                  </td>

                  <td className="h-12 text-center">
                    {clubInfo.fixtures.draws.total}
                  </td>
                </tr>
              ) : (
                <tr>Não há resultados disponíveis para este clube</tr>
              )}
            </tbody>
          </table>
        </section>

        <section className="mt-8 mb-10">
          <h3 className="mb-8 text-center text-2xl">
            Gols marcados por tempo de jogo
          </h3>

          <BarChart width={700} height={300} data={returnGraphFormat}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </section>
      </div>
    </div>
  );
}
