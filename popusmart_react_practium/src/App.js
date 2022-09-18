import React, { Component,Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
const Login = lazy(() => import('./Pages/Login'));
const Home = lazy(() => import('./Pages/Home'));
const Loader = lazy(() => import('./Pages/Common/Loader'));

class App extends Component {
  render() {
    return (
      <Suspense fallback={< Loader />}>
        <Switch>
          <Route  path="/Login" component={Login} />
          <Route path="/Home" component={Home} />
          <Redirect to='/Login' />
        </Switch>
      </Suspense >
    );
  }
}

export default withRouter(App);
