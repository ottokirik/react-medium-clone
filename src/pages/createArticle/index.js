import { ArticleForm } from 'components/articleForm';
import { CurrentUserContext } from 'context/currentUser';
import { useFetch } from 'hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const CreateArticle = () => {
  const apiUrl = '/articles';
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [{ isLoggedIn }] = useContext(CurrentUserContext);
  const initialValues = { title: '', description: '', body: '', tagList: [] };
  const [isSuccessfullsubmit, setIsSuccessfullSubmit] = useState(false);

  useEffect(() => {
    if (!response) return;
    setIsSuccessfullSubmit(true);
  }, [response, setIsSuccessfullSubmit]);

  const handleSubmit = (article) => {
    doFetch({
      method: 'post',
      data: { article },
    });
  };

  if (isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullsubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  return (
    <ArticleForm
      errors={(error && error.errors) || {}}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
};

export { CreateArticle };
