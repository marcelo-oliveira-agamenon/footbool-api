import { Dispatch, SetStateAction } from 'react';

export interface Context {
  showLoader: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
}
