import { createContext } from 'react';
import { iChildrenProps, iUserContext } from './types';




export const UserContext = createContext({} as iUserContext);

export const UserProvider = ({ children }: iChildrenProps) => {

 

  return (
    <UserContext.Provider
      value={{

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
