import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Stories from './stories';
import Feedback from './feedback';

export default class IndexAdmin extends React.Component {

  render() {
    return (<div className="layout">
      <Switch>
        <Route exact path="/admin" component={Landing}/>
        <Route exact path="/admin/stories" render={() =>
          <Stories
          title="Operations"
          desc="Use this page to moderate the fakenews stories in realtime"
          tHeaders={["Command","Action"]}
          tButtons={["checkbox,","blue","red"]}
          tRows={["Set new stories to go live automatically","Refresh imagery for all stories","Clear all stories from database"]}
          />
        }/>
        <Route path="/admin/feedback" component={Feedback}/>
        <Redirect to="/admin"/>
      </Switch>
    </div>)
  }
}
