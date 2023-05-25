import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import Header from '../../components/header';
import { League } from '../../interfaces/api';
import Select from '../../components/select';

type HomeSteps = 'league' | 'season' | 'club';

export default function Home() {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [homeStep, setHomeStep] = useState<HomeSteps>('league');
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');

  const getLeaguesByCountry = useCallback(async () => {
    const countryCode = localStorage.getItem('country_code') as string;
    const tokenKey = localStorage.getItem('token_key') as string;
    const url = new URLSearchParams({
      code: countryCode,
    });

    // await api.get("/leagues/" + url.toString(), {
    //   headers: {
    //     'x-apisports-key': tokenKey,
    //   },
    // }).then(response => {
    //   setLeagues(response.data.response)
    // })
  }, []);

  useEffect(() => {
    getLeaguesByCountry();
  }, [getLeaguesByCountry]);

  const returnLeagueSelectedFormat = useMemo(() => {
    return leagues && leagues.length > 0
      ? leagues.map((element) => {
          return {
            id: element.league.id,
            name: element.league.name,
          };
        })
      : [];
  }, [leagues]);

  const returnSeasonFormat = useMemo(() => {
    return leagues && leagues.length > 0
      ? leagues.map((element) => {
          return {
            year: element.seasons,
          };
        })
      : [];
  }, [leagues]);

  const handleSelectSeason = () => {
    localStorage.setItem('league_code', selectedLeague);
    localStorage.setItem('season', selectedSeason);
    navigate('/club');
  };

  return (
    <div>
      <Header />

      {homeStep === 'league' || homeStep === 'season' ? (
        <section>
          <Select
            label="Selecione uma liga:"
            data={returnLeagueSelectedFormat}
            onSelect={(data) => {
              setSelectedLeague(data as string);
              setHomeStep('season');
            }}
            keyName="name"
            keyValue="id"
          />

          {homeStep === 'season' ? (
            <Select
              label="Selecione uma temporada:"
              data={returnSeasonFormat}
              onSelect={(data) => {
                setSelectedSeason(data.toString());
                setHomeStep('club');
              }}
              keyName="name"
              keyValue="id"
            />
          ) : null}

          <button
            type="button"
            disabled={homeStep !== 'season'}
            onClick={handleSelectSeason}
          >
            Selecionar
          </button>
        </section>
      ) : (
        <section>club</section>
      )}
    </div>
  );
}
