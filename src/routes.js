import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { isAuthenticated } from "./services/auth";

import ClienteList from "./pages/ClienteList";
import ClienteForm from "./pages/ClienteForm";
import ClienteShow from "./pages/ClienteShow";
import SignIn from "./pages/SignIn";
import NotaHome from "./pages/NotaHome";
import NotaComprar from "./pages/NotaComprar";
import NotaPagar from "./pages/NotaPagar";
import NotaDetalhes from "./pages/NotaDetalhes";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: `/`, state: { from: props.location } }} />
      )
    }
  />
);

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={() => <h1>SignUp</h1>} />

      <PrivateRoute path="/clientes/create" component={ClienteForm} />
      <PrivateRoute path="/clientes/edit/:id" component={ClienteForm} />
      <PrivateRoute path="/clientes/show/:id" component={ClienteShow} />
      <PrivateRoute path="/clientes" component={ClienteList} />
      <PrivateRoute exact path="/notahome" component={NotaHome} />
      <PrivateRoute path="/notahome/:id" component={NotaHome} />
      <PrivateRoute exact path="/notacompra" component={NotaComprar} />
      <PrivateRoute path="/notacompra/:id" component={NotaComprar} />
      <PrivateRoute exact path="/notapagar" component={NotaPagar} />
      <PrivateRoute path="/notapagar/:id" component={NotaPagar} />
      <PrivateRoute path="/notadetalhe" component={NotaDetalhes} />

      <Route path="*" component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
