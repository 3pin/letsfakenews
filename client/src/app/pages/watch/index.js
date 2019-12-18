import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './landing';
import Watch from './watch';

const RoutesWatch = () => {
  return (<div className="layout">
      <Switch>
        <Route exact path="/watch" component={Landing}/>
        <Route path="/watch/display" component={Watch}/>
        <Redirect to="/watch"/>
      </Switch>
    </div>)
}
export default RoutesWatch
