import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { CurrentUserContext } from 'context/currentUser';

export const TopBar = () => {
  const [currentUserState] = useContext(CurrentUserContext);

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          React Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink exact className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {!currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Sign up
                </NavLink>
              </li>
            </>
          )}
          {currentUserState.isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/articles/new">
                  <i className="ion-compose"></i>
                  &nbsp;New Post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/settings">
                  <i className="ion-gear-a"></i>
                  &nbsp;Settings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profiles/${currentUserState.currentUser.username}`}
                >
                  <img className="user-pic" src={currentUserState.currentUser.image} alt="" />
                  &nbsp;{currentUserState.currentUser.username}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
