import { BrowserRouter as Router } from 'react-router-dom';

import { CurrentUserChecker } from 'components/currentUserChecker';
import { TopBar } from 'components/topBar';
import { CurrentUserProvider } from 'context/currentUser';
import { Routes } from 'routes';

function App() {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <Router>
          <TopBar />
          <Routes />
        </Router>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
}

export default App;
