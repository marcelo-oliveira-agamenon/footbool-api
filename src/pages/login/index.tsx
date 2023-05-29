import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from 'context';
import Logo from 'assets/football-illustration-file-sports-design-logo-free-png.webp';
import api from 'api';

export default function Login() {
  const navigate = useNavigate();
  const { setShowLoader } = useContext(context);
  const [tokenKey, setTokenKey] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenKey && tokenKey.length !== 0) {
      setShowLoader(true);

      await api
        .get('/status', {
          headers: {
            'x-apisports-key': tokenKey,
          },
        })
        .then((response) => {
          if (response.data.response.subscription.active) {
            localStorage.setItem('token_key', tokenKey);
            navigate('/home');
          }
        })
        .catch(() => {
          alert('Token inválido');
        })
        .finally(() => {
          setShowLoader(false);
        });

      return;
    }
  };

  return (
    <div className="h-full flex place-content-center">
      <div className="flex flex-col place-content-center">
        <img className="w-80 h-80 mx-auto" src={Logo} alt="meu time icone" />

        <div className="bg-blue-100 rounded-xl shadow-lg p-5">
          <h1 className="text-4xl font-medium font-mono">
            Bem vindo ao seu portal de dados sobre Futebol!
          </h1>

          <p className="mt-8 text-center font-medium text-lg">
            Para começar, precisamos do seu token para acessar a plataforma
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-20 bg-red-400 p-5 rounded-xl shadow-lg"
        >
          <label className="text-xl text-center" htmlFor="token_key">
            Insira aqui seu token
          </label>

          <input
            type="text"
            name="token_key"
            id="token_key"
            className="mt-5 rounded-md px-3 py-2 outline-none focus:shadow-lg transition-all duration-500"
            value={tokenKey}
            onChange={(event) => setTokenKey(event.target.value)}
          />

          <button
            type="submit"
            className="mt-8 bg-gray-100 py-2 px-12 w-fit mx-auto rounded-md text-lg disabled:bg-gray-500 hover:shadow-lg hover:bg-gray-300 transition-all duration-500"
            disabled={!tokenKey || tokenKey.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
