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
    if (!isLoading) {
      return;
    }

    const requestOptions = {
      ...options,
      headers: { authorization: token ? `Token ${token}` : '' },
    };

    axios(`${baseUrl}${url}`, requestOptions)
      .then((res) => {
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch((err) => {
        setIsLoading(false);

        setError(err.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};

export { useFetch };
