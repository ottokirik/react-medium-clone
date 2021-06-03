import { ErrorMessage } from 'components/errorMessage';
import { Loading } from 'components/loading';
import { TagList } from 'components/tagList';
import { CurrentUserContext } from 'context/currentUser';
import { useFetch } from 'hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

export const Article = ({
  match: {
    params: { slug },
  },
}) => {
  const apiUrl = `/articles/${slug}`;
  const [{ response, error, isLoading }, doFetch] = useFetch(apiUrl);
  const [{ response: deleteArticleResponse }, doDeleteArticle] = useFetch(apiUrl);

  const [{ isLoggedIn, currentUser }] = useContext(CurrentUserContext);
  const [isSuccessfullDelete, setIsSuccessfullDelete] = useState(false);

  const isAuthor = () => {
    if (!response || !isLoggedIn) return false;
    return response.article.author.username === currentUser.username;
  };

  const deleteArticle = () => {
    doDeleteArticle({
      method: 'delete',
    });
  };

  useEffect(() => {
    doFetch();
  }, [doFetch]);

  useEffect(() => {
    if (!deleteArticleResponse) return;
    setIsSuccessfullDelete(true);
  }, [deleteArticleResponse]);

  if (isSuccessfullDelete) return <Redirect to="/" />;

  return (
    <div className="article-page">
      <div className="banner">
        {!isLoading && response && (
          <div className="container">
            <h1>{response.article.title}</h1>
            <div className="article-meta">
              <Link to={`/profiles/${response.article.author.username}`}>
                <img src={response.article.author.image} alt="" />
              </Link>
              <div className="info">
                <Link to={`/profiles/${response.article.author.username}`}>
                  {response.article.author.username}
                </Link>
                <span className="date">{response.article.createdAt}</span>
              </div>
              {isAuthor() && (
                <span>
                  <Link className="btn btn-outline-secondary btn-sm" to={`/articles/${slug}/edit`}>
                    <i className="ion-edit"></i>Edit Atricle
                  </Link>
                  <button className="btn btn-outline-danger btn-sm" onClick={deleteArticle}>
                    <i className="ion-trash"></i>Delete Article
                  </button>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="container page">
        {isLoading && <Loading />}
        {error && <ErrorMessage />}
        {!isLoading && response && (
          <div className="row article-content">
            <div className="col-xs-12">
              <div>
                <p>{response.article.body}</p>
                <TagList tags={response.article.tagList} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
