import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import { useLocalStorage } from './useLocalStorage';

const useFetch = (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAfterDestroy = false;

    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options,
      headers: { authorization: token ? `Token ${token}` : '' },
    };

    axios(`${baseUrl}${url}`, requestOptions)
      .then((res) => {
        if (!skipGetResponseAfterDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((err) => {
        if (!skipGetResponseAfterDestroy) {
          setError(err.response.data);
          setIsLoading(false);
        }
      });

    return () => {
      // Функция выполняется, когда компоенент анмаунтится
      skipGetResponseAfterDestroy = true;
    };
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};

export { useFetch };
