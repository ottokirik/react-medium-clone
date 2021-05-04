import { useContext, useEffect } from 'react';

import { CurrentUserContext } from '../context/currentUser';
import { useFetch } from '../hooks/useFetch';
import { useLocalStorage } from '../hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user');
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }
    doFetch();
    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [token, setCurrentUserState, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }

    setCurrentUserState((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};

export { CurrentUserChecker };
