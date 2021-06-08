import { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { BackendErrorMessages } from 'components/backendErrorMessage';
import { useFetch } from 'hooks/useFetch';
import { CurrentUserContext, setAuthorized, doLogout } from 'context/currentUser';
import { useLocalStorage } from 'hooks/useLocalStorage';

export const Settings = () => {
  const apiUrl = '/user';
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const [currentUserState, dispatch] = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccessfullLogout, setIsSuccessfullLogout] = useState(false);
  const [, setToken] = useLocalStorage('token');

  const handleSubmit = (event) => {
    event.preventDefault();
    doFetch({
      method: 'put',
      data: {
        user: {
          ...currentUserState.currentUser,
          image,
          email,
          bio,
          password,
          username: name,
        },
      },
    });
  };

  const logout = (event) => {
    event.preventDefault();

    setToken('');
    dispatch(doLogout());
    setIsSuccessfullLogout(true);
  };

  useEffect(() => {
    if (!currentUserState.currentUser) {
      return;
    }

    const currentUser = currentUserState.currentUser;

    setName(currentUser.username || '');
    setImage(currentUser.image || '');
    setBio(currentUser.bio || '');
    setEmail(currentUser.email || '');
  }, [currentUserState.currentUser]);

  useEffect(() => {
    if (!response) {
      return;
    }

    dispatch(setAuthorized(response.user));
  }, [response, dispatch]);

  if (isSuccessfullLogout) {
    return <Redirect to="/" />;
  }

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your settings</h1>
            {error && <BackendErrorMessages backendErrors={error.errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="URL of profile picture"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Short bio"
                    value={bio}
                    rows="8"
                    onChange={(e) => setBio(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </fieldset>
                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                  Update settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};