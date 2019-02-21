import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Story from '../../app/components/write';
import Title from '../../app/components/write_title';
import Thankyou from '../../app/components/write_thankyou';
import Feedback from '../../app/components/write_feedback';

export default class LayoutUser extends React.Component {

  render() {
    return (<div className="layout">
      <Switch>
        <Route path="/write" exact component={Story}/>
        <Route path="/write/title" component={Title}/>
        <Route path="/write/thankyou" component={Thankyou}/>
        <Route path="/write/feedback" component={Feedback}/>
        <Redirect to="/write"/>
      </Switch>
    </div>)
  }
}
