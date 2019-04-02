import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
//
import Landing from './landing';
import Write from './write/index_write';
import Admin from './admin/index_admin';
import Watch from './watch/index_watch';
import NavFrame from '../../app/components/navframe';

export default class Index extends React.Component {
  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    this.callApi('/settings/mode')
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
  render() {
    return (<div>
      <br/>
      <NavFrame title="Let's Fake News" links={["home", "write", "watch", "admin"]}/>
      <br/>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Landing}/>
        <Route path={`${process.env.PUBLIC_URL}/write`} render={() => <Write path={`${process.env.PUBLIC_URL}/write`}/>}/>
        <Route path={`${process.env.PUBLIC_URL}/admin`} render={() => <Admin path={`${process.env.PUBLIC_URL}/admin`}/>}/>
        <Route path={`${process.env.PUBLIC_URL}/watch`} component={Watch}/>
        <Redirect to={`${process.env.PUBLIC_URL}/`}/>
      </Switch>
    </div>)
  }
}
