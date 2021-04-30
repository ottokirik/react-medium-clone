import { BrowserRouter as Router } from 'react-router-dom';
import { TopBar } from './components/topBar';

import { Routes } from './pages/routes';

function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
