import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import { RouteInterface } from '../routesAndLinks';
// import { connect } from 'react-redux';

export const ProtectedRoute = ({ component: Component, path, exact }: RouteInterface) => {
  const token = true;
  return (
    <Route
      path={path}
      exact={exact}
      // @ts-ignore
      render={(props) => (token ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
};

/* const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(ProtectedRoute); */
