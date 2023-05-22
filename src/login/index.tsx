import { useState } from 'react';

type LoginStep = 'token' | 'country';

export default function Login() {
  const [loginStep, setLoginStep] = useState<LoginStep>('token');
  const [tokenKey, setTokenKey] = useState('');

  return (
    <div className="bg-orange-200">
      {loginStep === 'token' ? (
        <>
          <div>
            <h1>Meu time!</h1>
          </div>

          <form action="">
            <label htmlFor="token_key">Insira aqui seu token:</label>

            <input
              type="text"
              name="token_key"
              id="token_key"
              value={tokenKey}
              onChange={(event) => setTokenKey(event.target.value)}
            />
          </form>
        </>
      ) : (
        <>
          <div>second</div>
        </>
      )}
    </div>
  );
}
