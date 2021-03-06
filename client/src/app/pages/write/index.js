import React from 'react';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Landing from './landing';
import WriteStory from './story';
import WriteTitle from './title';
import Review from './review';
import WriteFeedback from './feedback';
import Thankyou from './thankyou';

const RoutesWrite = () => (
  <div>
    <Switch>
      <Route exact path="/write" component={Landing} />
      <Route path="/write/story" component={WriteStory} />
      <Route path="/write/title" component={WriteTitle} />
      <Route path="/write/review" component={Review} />
      <Route path="/write/feedback" component={WriteFeedback} />
      <Route path="/write/thankyou" component={Thankyou} />
      <Redirect to="/write" />
    </Switch>
  </div>
);
export default RoutesWrite;
