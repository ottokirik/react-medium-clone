import { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { BackendErrorMessages } from 'components/backendErrorMessage';
import { CurrentUserContext, setAuthorized } from 'context/currentUser';
import { useFetch } from 'hooks/useFetch';
import { useLocalStorage } from 'hooks/useLocalStorage';

const pageContent = (page) => {
  const content = {
    '/login': {
      pageTitle: 'Sign In',
      descriptionLink: '/register',
      descriptionText: 'Need an account?',
      apiUrl: '/users/login',
    },
    '/register': {
      pageTitle: 'Sign Up',
      descriptionLink: '/login',
      descriptionText: 'Have an account?',
      apiUrl: '/users',
    },
  };

  return content[page];
};

// match передается из router
export const Authentication = ({ match: { path } }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);
  const isLogin = path === '/login';
  const { pageTitle, descriptionLink, descriptionText, apiUrl } = pageContent(path);

  const [{ isLoading, response, error }, doFetch] = useFetch(apiUrl);
  const [, setToken] = useLocalStorage('token');
  const [, dispatch] = useContext(CurrentUserContext);

  useEffect(() => {
    if (!response) {
      return;
    }

    setToken(response.user.token);
    setIsSuccessfullSubmit(true);
    dispatch(setAuthorized(response.user));
  }, [response, setToken, dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = isLogin ? { email, password } : { email, password, username };
    doFetch({
      method: 'post',
      data: {
        user,
      },
    });
  };

  if (isSuccessfullSubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="col-md-6 offset-md-3 col-xs-12">
          <h1 className="text-xs-center">{pageTitle}</h1>
          <p className="text-xs-center">
            <Link to={descriptionLink}>{descriptionText}</Link>
          </p>
          <form onSubmit={handleSubmit}>
            {error && <BackendErrorMessages backendErrors={error.errors || {}} />}
            <fieldset>
              {!isLogin && (
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                </fieldset>
              )}
              <fieldset className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                disabled={isLoading}
              >
                {pageTitle}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};
