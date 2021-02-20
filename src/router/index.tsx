import { Route, Switch, BrowserRouter, useHistory } from 'react-router-dom';
import Editar from '../pages/editar/Editar';
import Home from '../pages/home/Home';

const Routes = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path='/editar' component={Editar} />
        </Switch>
    </BrowserRouter>
  );
};

export default Routes;
