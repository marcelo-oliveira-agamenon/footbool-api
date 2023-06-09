import { useCallback, useEffect, useMemo, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from 'api';
import { context } from 'context';
import Header from 'components/header';
import { Country, League } from 'interfaces/api';
import Select from 'components/select';

export default function Home() {
  const navigate = useNavigate();
  const { setShowLoader } = useContext(context);
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [listOfCountries, setListOfCountries] = useState<Country[]>([]);
  const [country, setCountry] = useState('');
  const tokenKey = localStorage.getItem('token_key') as string;

  const getLeaguesByCountry = useCallback(async () => {
    setShowLoader(true);
    const url = new URLSearchParams({
      code: country,
    });

    await api
      .get('/leagues?' + url.toString(), {
        headers: {
          'x-apisports-key': tokenKey,
        },
      })
      .then((response) => {
        setLeagues(response.data.response);
        setShowLoader(false);
      });
  }, [tokenKey, country, setShowLoader]);

  const getCountriesAvaliable = useCallback(async () => {
    setShowLoader(true);

    await api
      .get('/countries', {
        headers: {
          'x-apisports-key': tokenKey,
        },
      })
      .then((response) => {
        setListOfCountries(response.data.response);
        setShowLoader(false);
      });
  }, [tokenKey, setShowLoader]);

  useEffect(() => {
    getCountriesAvaliable();
  }, [getCountriesAvaliable]);

  useEffect(() => {
    if (listOfCountries.length !== 0) {
      getLeaguesByCountry();
    }
  }, [getLeaguesByCountry, listOfCountries]);

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

  const returnSeasonFormat = useCallback(() => {
    const seasons = leagues.find(
      (element) => element.league.id === Number(selectedLeague)
    );
    return seasons
      ? seasons.seasons.map((season) => {
          return {
            year: season.year,
          };
        })
      : [];
  }, [leagues, selectedLeague]);

  const handleSelectSeason = () => {
    localStorage.setItem('country_code', country);
    localStorage.setItem('league_code', selectedLeague);
    localStorage.setItem('season', selectedSeason);
    navigate('/club');
  };

  return (
    <div>
      <Header />

      <section className="flex flex-col justify-center items-center bg-red-400 mt-28 w-3/5 mx-auto rounded-xl px-3 py-5 shadow-lg">
        <Select
          label="Escolha o país"
          isDisabled={listOfCountries.length === 0}
          defaultText="Escolha o país"
          data={listOfCountries}
          onSelect={(data) => setCountry(data as string)}
          keyName="name"
          keyValue="code"
        />

        <div className="my-6" />

        <Select
          label="Selecione uma liga"
          data={returnLeagueSelectedFormat}
          isDisabled={returnLeagueSelectedFormat.length === 0}
          defaultText="Escolha a liga"
          onSelect={(data) => setSelectedLeague(data.toString())}
          keyName="name"
          keyValue="id"
        />

        <div className="my-6" />

        {selectedLeague.length !== 0 ? (
          <Select
            label="Selecione uma temporada"
            isDisabled={returnSeasonFormat().length === 0}
            defaultText="Escolha a temporada"
            data={returnSeasonFormat()}
            onSelect={(data) => setSelectedSeason(data.toString())}
            keyName="year"
            keyValue="year"
          />
        ) : null}

        <button
          className="mt-10 bg-gray-100 cursor-pointer py-2 px-12 w-fit mx-auto rounded-md text-lg disabled:bg-gray-500 hover:shadow-lg hover:bg-gray-300 transition-all duration-500"
          type="button"
          disabled={selectedLeague === '' || selectedSeason === ''}
          onClick={handleSelectSeason}
        >
          Selecionar
        </button>
      </section>
    </div>
  );
}
