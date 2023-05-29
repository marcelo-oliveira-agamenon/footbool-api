import { createContext } from 'react';
import { Context as ContextType } from 'interfaces/context';

const defaultValue: ContextType = {
  showLoader: false,
  setShowLoader: () => {},
};
const context = createContext(defaultValue);

export { context };
