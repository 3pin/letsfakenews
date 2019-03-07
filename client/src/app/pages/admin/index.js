import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Stories from './stories';
import Feedback from './feedback';

export default class IndexAdmin extends React.Component {
  constructor() {
    super();
    //this.handleChange = this.handleChange.bind(this);
    this.apiCall = this.apiCall.bind(this);
    //this.apiPost = this.apiPost.bind(this);
    //this.state = {story: "",title: "",feedback: ""}
  }
  apiCall = async (apiEndPoint) => {
    const response = await fetch(apiEndPoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    // say hello into the backend server
    this.apiCall(this.props.path).then(res => console.log(res)).catch(err => console.log(err));
  }
  render() {
    return (<div className="layout">
      <Switch>
        <Route exact path="/admin" component={Landing}/>
        <Route path="/admin/feedback" render={() =>
          <Feedback
          title="feedback"
          path="/admin/feedback"
          desc="Use this page to view user feedback in realtime"
          tHeaders={["Command","Action"]}
          tButtons={["checkbox,","blue","red"]}
          tRows={["Set new stories to go live automatically","Refresh imagery for all stories","Clear all stories from database"]}
          />
        }/>
        <Route path="/admin/stories" render={() =>
          <Stories
          title="Stories"
          desc="Use this page to moderate fakenews stories in realtime"
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
