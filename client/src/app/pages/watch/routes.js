import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './landing';
import Watch from './watch';
import Visualise from './visualise';

const RoutesWatch = () => {
  return (<div className="layout">
      <Switch>
        <Route exact path="/watch" component={Landing}/>
        <Route path="/watch/display" component={Watch}/>
        <Route path="/watch/visualise" render={() =>
          <Visualise
          title="Visualise"
          desc="Use this page to visualise stories in realtime"
          apiHello="/watch/visualise"
          />
        }/>
        <Redirect to="/watch"/>
      </Switch>
    </div>)
}
export default RoutesWatch
