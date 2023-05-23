import { useState } from 'react';
import countries from '../helpers/countries.json';

type LoginStep = 'token' | 'country';

export default function Login() {
  const [loginStep, setLoginStep] = useState<LoginStep>('token');
  const [tokenKey, setTokenKey] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenKey && tokenKey.length !== 0) {
      // save token key on state
      setLoginStep('country');
      return;
    }
  };

  const handleCountrySelection = () => {};

  return (
    <div className="bg-orange-200 h-full flex place-content-center">
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
          <label htmlFor="">Escolha o país:</label>

          <select
            name=""
            id=""
            onChange={(event) => setCountry(event.target.value)}
          >
            {countries &&
              countries.map((country) => (
                <option value={country.name} id={country.code}>
                  {country.name}
                </option>
              ))}
          </select>

          <button type="button" onClick={handleCountrySelection}>
            Selecionar
          </button>
        </div>
      )}
    </div>
  );
}
