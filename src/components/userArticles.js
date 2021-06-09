import { useFetch } from 'hooks/useFetch';
import { stringify } from 'query-string';
import { useEffect } from 'react';
import { getPaginator, limit } from 'utils';
import { ErrorMessage } from './errorMessage';
import { Feed } from './feed';
import { Loading } from './loading';
import { Pagination } from './pagination';

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

export const UserArticles = ({ username, location, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const isFavorites = location.pathname.includes('favorites');
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => {
    doFetch();
  }, [doFetch, isFavorites]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            currentPage={currentPage}
            url={url}
          />
        </>
      )}
    </div>
  );
};
