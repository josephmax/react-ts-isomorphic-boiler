import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { routes } from "./routes";
export const App: React.SFC = () => (
  <>
    <ul>
      {routes.map((route, i) => (
        <li key={i}>
          <Link to={route.path}>{route.text}</Link>
        </li>
      ))}
    </ul>
    <Switch>
      <Redirect exact path="/" to={routes[0].path} />
      {routes.map((route, i) => (
        <Route key={i} path={route.path} exact component={route.component} />
      ))}
    </Switch>
  </>
);
