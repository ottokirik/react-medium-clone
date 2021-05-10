import { useFetch } from 'hooks/useFetch';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ErrorMessage } from 'components/errorMessage';
import { Loading } from 'components/loading';

const PopularTags = () => {
  const [{ response, isLoading, error }, doFetch] = useFetch('/tags');

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  if (isLoading || !response) return <Loading />;
  if (error) return <ErrorMessage />;

  return (
    <>
      <div className="sidebar">
        <p>Popular tags</p>
        <div className="tag-list">
          {response.tags.map((tag) => (
            <Link
              className="tag-default tag-pill"
              to={`/tags/${tag}`}
              key={tag}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export { PopularTags };
