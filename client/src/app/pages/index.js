import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
//
import Landing from './landing';
import Write from './write/index';
import Admin from './admin/index';
import Watch from './watch/index';
//
import Title from '../../app/components/title';
import NavFrame from '../../app/components/navlinks';

export default class IndexLanding extends React.Component {
  render() {
    return (<div>
      <br/>
      <Title/>
      <NavFrame/>
      <br/>
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/write" component={Write}/>
        <Route path="/admin" component={Admin}/>
        <Route path="/watch" component={Watch}/>
        <Redirect to="/"/>
      </Switch>
    </div>)
  }
}
