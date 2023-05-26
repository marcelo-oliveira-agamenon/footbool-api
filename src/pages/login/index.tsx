import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [tokenKey, setTokenKey] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (tokenKey && tokenKey.length !== 0) {
      // save token key on state
      localStorage.setItem('token_key', tokenKey);
      navigate('/home');
      return;
    }
  };

  return (
    <div className="h-full flex place-content-center">
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
    </div>
  );
}
