import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Admin from '../../app/components/admin';

export default class LayoutAdmin extends React.Component {

  render() {
    return (<div className="layout">
      <Switch>
        <Route path="/admin" exact component={Admin}/>
        <Redirect to="/admin"/>
      </Switch>
    </div>)
  }
}
