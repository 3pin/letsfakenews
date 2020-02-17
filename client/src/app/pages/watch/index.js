import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Landing from './landing';
import Visualise_News from './news';
import Visualise_Text from './text_p5';
import Visualise_Images from './images_p5';

const RoutesWatch = () => {
  return (<div className="layout">
      <Switch>
        <Route exact path="/watch" component={Landing}/>
        <Route path="/watch/news" component={Visualise_News}/>
        <Route path="/watch/text" component={Visualise_Text}/>
        <Route path="/watch/images" component={Visualise_Images}/>
        <Redirect to="/watch"/>
      </Switch>
    </div>)
}
export default RoutesWatch
