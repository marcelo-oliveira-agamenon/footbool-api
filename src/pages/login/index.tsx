import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import { Country } from '../../interfaces/api';
import Select from '../../components/select';

type LoginStep = 'token' | 'country';

export default function Login() {
  const navigate = useNavigate();
  const [loginStep, setLoginStep] = useState<LoginStep>('token');
  const [tokenKey, setTokenKey] = useState('');
  const [country, setCountry] = useState('');
  const [listOfCountries, setListOfCountries] = useState<Country[]>([]);

  const getCountriesAvaliable = useCallback(async () => {
    await api
      .get('/countries', {
        headers: {
          'x-apisports-key': tokenKey,
        },
      })
      .then((response) => {
        setListOfCountries(response.data.response);
      });
  }, [tokenKey]);

  useEffect(() => {
    if (loginStep === 'country') {
      getCountriesAvaliable();
    }
  }, [loginStep, getCountriesAvaliable]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenKey && tokenKey.length !== 0) {
      // save token key on state
      setLoginStep('country');
      localStorage.setItem('token_key', tokenKey);
      return;
    }
  };

  const handleCountrySelection = () => {
    localStorage.setItem('country_code', country);
    navigate('/home');
  };

  return (
    <div className="h-full flex place-content-center">
      {loginStep === 'token' ? (
        <div className="flex flex-col place-content-center">
          <h1>Meu time!</h1>

          <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="token_key">Insira aqui seu token:</label>

            <input
              type="text"
              name="token_key"
              id="token_key"
              value={tokenKey}
              onChange={(event) => setTokenKey(event.target.value)}
            />

            <button type="submit" disabled={!tokenKey || tokenKey.length === 0}>
              Cadastrar
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col place-content-center">
          <Select
            label="Escolha o país:"
            data={listOfCountries}
            onSelect={(data) => setCountry(data as string)}
            keyName="name"
            keyValue="code"
          />

          <button type="button" onClick={handleCountrySelection}>
            Selecionar
          </button>
        </div>
      )}
    </div>
  );
}
