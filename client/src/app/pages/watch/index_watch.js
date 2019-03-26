import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Watch from './watch';

export default class IndexWatch extends React.Component {

  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    // load the activelist for display purposes
    //this.callApi('/settings/activelist').then(res => console.log('Activelist loaded')).catch(err => console.log(err));
  }
  render() {
    return (<div className="layout">
      <Switch>
        <Route exact path="/watch" component={Landing}/>
        <Route path="/watch/display" component={Watch}/>
        <Redirect to="/watch"/>
      </Switch>
    </div>)
  }
}
