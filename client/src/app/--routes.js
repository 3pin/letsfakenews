import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// pages
import Intro from './intro';
import RoutesLanding from './pages/routes';

const Routes = () => {
  return (
      <Switch>
        <Route exact path='/' component={Intro}/>
        <Route path='/landing' component={RoutesLanding}/>
        <Redirect to='/'/>
      </Switch>
  )
}
export default Routes
