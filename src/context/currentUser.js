import { createContext, useState } from 'react';

const CurrentUserContext = createContext([{}, () => {}]);

const CurrentUserProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    isLoggedIn: null,
    currentUser: null,
  });
  return (
    <CurrentUserContext.Provider value={[state, setState]}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserProvider };
