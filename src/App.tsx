import React from 'react';
import './css/dist/index.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { routes, RouteInterface } from './routesAndLinks';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
