import { render, screen } from '@testing-library/react';
import Login from '../pages/login/index';
import { BrowserRouter } from 'react-router-dom';

describe('Login tests', () => {
  it('should render Login component', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it('should button "cadastrar" be disabled', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/Cadastrar/i)).toBeDisabled();
  });
});
