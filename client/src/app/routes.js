import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
// middleware
import withAuth from './components/withAuth';
import checkDevice from './components/checkDevice';
// components
import Landing from './pages/landing';
import RoutesWrite from './pages/write/routes';
import RoutesAdmin from './pages/admin/routes';
import RoutesWatch from './pages/watch/routes';
import NavFrame from './components/navframe';
import Login from './pages/admin/login';

export default class Routes extends React.Component {
  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    // load db settings
    //this.callApi('/settings/mode').then(res => console.log(res)).catch(err => console.log(err));
  }
  render() {
    return (<div>
      <br/>
      <NavFrame title="LetsFakeNews" links={["home", "write", "watch", "admin"]}/>
      <br/>
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route path='/write' component={RoutesWrite}/>
        <Route path='/watch' component={checkDevice(RoutesWatch)}/>
        <Route path='/admin' component={withAuth(RoutesAdmin)}/>
        <Route path='/login' component={Login}/>
        <Redirect to='/'/>
      </Switch>
    </div>)
  }
}
