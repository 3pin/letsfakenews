import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Stories from './stories';
import Feedback from './feedback';

export default class IndexAdmin extends React.Component {

  callApi = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentWillMount() {
    // say hello into the backend server
    this.callApi('/admin').then(res => console.log(res)).catch(err => console.log(err));
  }
  render() {
    return (<div className="layout">
      <Switch>
        <Route exact path="/admin" component={Landing}/>
        <Route path="/admin/feedback" component={Feedback}/>
        <Route path="/admin/stories" render={() =>
          <Stories
          title="Operations"
          desc="Use this page to moderate the fakenews stories in realtime"
          tHeaders={["Command","Action"]}
          tButtons={["checkbox,","blue","red"]}
          tRows={["Set new stories to go live automatically","Refresh imagery for all stories","Clear all stories from database"]}
          />
        }/>
        <Redirect to="/admin"/>
      </Switch>
    </div>)
  }
}
