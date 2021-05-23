import { useContext, useEffect } from 'react';

import { CurrentUserContext, loading, setAuthorized, setUnauthorized } from 'context/currentUser';
import { useFetch } from 'hooks/useFetch';
import { useLocalStorage } from 'hooks/useLocalStorage';

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch('/user');
  const [, dispatch] = useContext(CurrentUserContext);
  const [token] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      dispatch(setUnauthorized());
      return;
    }
    doFetch();
    dispatch(loading());
  }, [token, dispatch, doFetch]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch(setAuthorized(response.user));
  }, [response, dispatch]);

  return children;
};

export { CurrentUserChecker };
