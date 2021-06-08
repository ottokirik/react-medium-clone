import { Switch, Route } from 'react-router-dom';

import { GlobalFeed } from 'pages/globalFeed';
import { Article } from 'pages/article';
import { Authentication } from 'pages/authentication';
import { TagFeed } from 'pages/tagFeed';
import { YourFeed } from 'pages/yourFeed';
import { CreateArticle } from 'pages/createArticle';
import { EditArticle } from 'pages/editArticle';
import { Settings } from 'pages/settings';

export const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/settings" component={Settings} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/feed" component={YourFeed} />
      <Route path="/login" component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
