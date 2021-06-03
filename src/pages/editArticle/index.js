import { ArticleForm } from 'components/articleForm';
import { CurrentUserContext } from 'context/currentUser';
import { useFetch } from 'hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

export const EditArticle = ({
  match: {
    params: { slug },
  },
}) => {
  const apiUrl = `/articles/${slug}`;
  const [{ response: fetchArticleResponse }, doFetchArticle] = useFetch(apiUrl);
  const [{ response: updateArticleResponse, error: updateArticleError }, doUpdateArticle] =
    useFetch(apiUrl);
  const [initialValues, setInitialValues] = useState(null);
  const [{ isLoggedIn }] = useContext(CurrentUserContext);
  const [isSuccessfullsubmit, setIsSuccessfullSubmit] = useState(false);

  const handleSubmit = (article) => {
    doUpdateArticle({
      method: 'put',
      data: { article },
    });
  };

  useEffect(() => {
    doFetchArticle();
  }, [doFetchArticle]);

  useEffect(() => {
    if (!fetchArticleResponse) return;

    const {
      article: { title, description, body, tagList },
    } = fetchArticleResponse;

    setInitialValues({
      title,
      description,
      body,
      tagList,
    });
  }, [fetchArticleResponse]);

  useEffect(() => {
    if (!updateArticleResponse) return;
    setIsSuccessfullSubmit(true);
  }, [updateArticleResponse, setIsSuccessfullSubmit]);

  if (isLoggedIn === false) return <Redirect to="/" />;

  if (isSuccessfullsubmit) return <Redirect to={`/articles/${slug}`} />;

  return (
    <ArticleForm
      errors={(updateArticleError && updateArticleError.errors) || {}}
      onSubmit={handleSubmit}
      initialValues={initialValues}
    />
  );
};
