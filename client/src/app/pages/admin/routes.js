import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Landing from './landing';
import Stories from './stories';
import Feedback from './feedback';

export default class RoutesAdmin extends React.Component {
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
    //this.apiCall(this.props.match.url).then(res => console.log(res)).catch(err => console.log(err));
  }
  render() {
    return (<div className="layout">
      <Switch>
        <Route exact path="/admin" component={Landing}/>
        <Route path="/admin/feedback" render={() =>
          <Feedback
          title="Feedback"
          desc="Use this page to view user feedback in realtime"
          apiHello="/admin/feedback"
          apiClear="/admin/clear"
          />
        }/>
        <Route path="/admin/stories" render={() =>
          <Stories
          title="Stories"
          desc="Use this page to moderate fakenews stories in realtime"
          apiHello="/admin/stories"
          apiAutolive="/admin/stories/autolive"
          apiRefresh="/admin/stories/refresh"
          apiClear="/admin/clear"
          apiRemove="/admin/story/remove"
          apiStorylive="/admin/story/storylive"
          />
        }/>
        <Redirect to="/admin"/>
      </Switch>
    </div>)
  }
}
