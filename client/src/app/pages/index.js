import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
//
import Landing from './landing';
import Write from './write/index';
import Admin from './admin/index';
import Watch from './watch/index';
//
import Title from '../../app/components/title';
import Links from '../../app/components/links';

export default class IndexLanding extends React.Component {

  render() {
    return (<div>
      <Title title="Let's Fake News"/>
      <hr/>
      <Links/>
      <hr/>
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
