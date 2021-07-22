import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({
  isUserLogged,
  path,
  Component,
  ...rest
}) {
  return (
    <Route exact path={path}>
      {isUserLogged ? <Component {...rest} /> : <Redirect to="/" />}
    </Route>
  );
}
