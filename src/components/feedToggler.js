import { CurrentUserContext } from 'context/currentUser';
import { useContext } from 'react';

const { NavLink } = require('react-router-dom');

const FeedToggler = ({ tagName }) => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <div className="feed-toggler">
      <ul className="nav nav-pills outline-active">
        {currentUserState.isLoggedIn && (
          <li className="nav-item">
            <NavLink className="nav-link" to="/feed">
              Your Feed
            </NavLink>
          </li>
        )}
        <li className="nav-item">
          <NavLink className="nav-link" to="/" exact>
            Global Feed
          </NavLink>
        </li>
        {tagName && (
          <li className="nav-item">
            <NavLink className="nav-link" to={`/tags/${tagName}`} exact>
              <i className="ion-pound">&nbsp;</i>
              {tagName}
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
};

export { FeedToggler };
