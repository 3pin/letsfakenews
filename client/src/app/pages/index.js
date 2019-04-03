import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// middleware
import withAuth from '../components/withAuth';
// components
import Landing from './landing';
import Write from './write/index_write';
import Admin from './admin/index_admin';
import Watch from './watch/index_watch';
import NavFrame from '../../app/components/navframe';
import Login from '../pages/admin/login';

export default class Index extends React.Component {
  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    console.log(process.env.PUBLIC_URL);
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
        <Route exact path='/' component={Landing}/>
        <Route path='/write' render={() => <Write path='/write'/>}/>
        <Route path='/admin' render={() => <Admin path='/admin'/>}/>
        <Route path='/_admin' component={withAuth(Admin)}/>
        <Route path='/watch' component={Watch}/>
        <Route path='/login' component={Login}/>
        <Redirect to='/'/>
      </Switch>
    </div>)
  }
}
