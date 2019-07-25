  import React from 'react';
  import {
    Route,
    Switch,
    Redirect
  } from 'react-router-dom';

  import Landing from './landing';
  import Stories from './stories';
  import Feedback from './feedback';

  const RoutesAdmin = (props) => {
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
  export default RoutesAdmin
