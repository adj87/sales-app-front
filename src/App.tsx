import React from 'react';
import './css/dist/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes, RouteInterface } from './routesAndLinks';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map(({ component, path, exact, authIsRequired }: RouteInterface) => {
          if (authIsRequired) {
            return <ProtectedRoute component={component} path={path} exact={exact} />;
          }
          return <Route component={component} path={path} exact={exact} />;
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
