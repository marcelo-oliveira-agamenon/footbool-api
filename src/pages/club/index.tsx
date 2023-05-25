import React, { useCallback, useEffect, useState } from 'react';
import api from '../../api';
import Header from '../../components/header';
import { Player as IPlayer } from '../../interfaces/api';
import { useParams } from 'react-router-dom';

export default function Club() {
  const { id } = useParams();
  const [availablePlayers, setAvailablePlayers] = useState<Array<IPlayer>>([]);
  const [page, setPage] = useState(1);

  const getClubInfo = useCallback(async () => {
    const season = localStorage.getItem('season') as string;
    const tokenKey = localStorage.getItem('token_key') as string;

    const url = new URLSearchParams({
      team: id || '',
      season,
      page: page.toString(),
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
  }, [page, id]);

  useEffect(() => {
    getClubInfo();
  }, [getClubInfo]);

  return (
    <div>
      <Header />

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
            <td>Não há jogadores disponíveis</td>
          )}
        </tbody>
      </table>
    </div>
  );
}
