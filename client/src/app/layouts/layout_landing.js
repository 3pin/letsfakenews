import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from '../../app/components/landing';
import LayoutUser from './layout_user';
import LayoutAdmin from './layout_admin';
import Watch from '../../app/components/watch';

export default class LayoutLanding extends React.Component {

  render() {
    return (<div className="layout">
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/write" component={LayoutUser}/>
        <Route path="/admin" component={LayoutAdmin}/>
        <Route path="/watch" component={Watch}/>
        <Redirect to="/"/>
      </Switch>
    </div>)
  }
}
