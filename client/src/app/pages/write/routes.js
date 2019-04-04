import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Story from './story';
import Title from './title';
import Feedback from './feedback';
import Thankyou from './thankyou';

export default class RoutesWrite extends React.Component {
  render() {
    return (<div>
      <Switch>
        <Route exact path="/write" component={Landing}/>
        <Route path="/write/story" component={Story}/>
        <Route path="/write/title" component={Title}/>
        <Route path="/write/feedback" component={Feedback}/>
        <Route path="/write/thankyou" component={Thankyou}/>
        <Redirect to="/write"/>
      </Switch>
    </div>)
  }
}
