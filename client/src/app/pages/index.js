import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
//
import Landing from './landing';
import Write from './write/index';
import Admin from './admin/index';
import Watch from './watch/index';
//
import NavFrame from '../../app/components/navframe';

export default class Index extends React.Component {
  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentWillMount() {
    // say hello into the backend server
    this.callApi('/settings/activelist')
    .then(res => console.log(res))
    .catch(err => console.log(err));
  }
  render() {
    return (<div>
      <br/>
      <NavFrame title="Let's Fake News" links={["home", "write", "watch", "admin"]}/>
      <br/>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/write" render={() => <Write path="/write"/>}/>
        <Route path="/admin" render={() => <Admin path="/admin"/>}/>
        <Route path="/watch" component={Watch}/>
        <Redirect to="/"/>
      </Switch>
    </div>)
  }
}
