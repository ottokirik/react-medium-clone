import { Switch, Route } from 'react-router-dom';

import { GlobalFeed } from 'pages/globalFeed';
import { Article } from 'pages/article';
import { Authentication } from 'pages/authentication';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
