import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
//
import Write from './write';
import Admin from './admin';
//
import Title from '../../app/components/title';
import Links from '../../app/components/links';
//
import Landing from '../../app/pages/landing';
import Watch from '../../app/pages/watch';

export default class LayoutLanding extends React.Component {

  render() {
    return (<div>
      <Title title="Let's Fake News"/>
      <Links/>
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
