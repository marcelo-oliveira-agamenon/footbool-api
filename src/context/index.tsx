import { createContext } from 'react';
import { Context as ContextType } from '../interfaces/context';

const defaultValue: ContextType = {
  country: 'Brazil',
  tokenApi: '',
};
const Context = createContext(defaultValue);

export default Context;
