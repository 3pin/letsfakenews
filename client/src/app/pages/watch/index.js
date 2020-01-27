import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './landing';
import Watch from './watch';
//import Visualise from './visualise';
import Visualise_Text from './visualise_text';
import Visualise_Images from './visualise_images';

const RoutesWatch = () => {
  return (<div className="layout">
      <Switch>
        <Route exact path="/watch" component={Landing}/>
        <Route path="/watch/news" component={Watch}/>
        <Route path="/watch/text" component={Visualise_Text}/>
        <Route path="/watch/images" component={Visualise_Images}/>
        <Redirect to="/watch"/>
      </Switch>
    </div>)
}
export default RoutesWatch
