import { Link, NavLink } from 'react-router-dom';

export const TopBar = () => (
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
      </ul>
    </div>
  </nav>
);
