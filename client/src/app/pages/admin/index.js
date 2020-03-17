import React from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Landing from './landing'
import Stories from './stories'
import Feedback from './feedback'
import Visualise from './visualise'

const RoutesAdmin = (props) => {
  return (
    <div className='layout'>
      <Switch>
        <Route exact path='/admin' component={Landing} />
        <Route
          path='/admin/stories' render={() =>
            <Stories
              title='Stories'
              desc='Use this page to moderate fakenews stories in realtime'
              apiHello='/admin/stories'
              apiVisualise='/admin/stories/visualise'
              apiAutolive='/admin/stories/autolive'
              apiRefresh='/admin/stories/refresh'
              apiClear='/admin/stories/clear'
              apiRemove='/admin/stories/remove'
              apiStorylive='/admin/stories/storylive'
            />}
        />
        <Route
          path='/admin/feedback' render={() =>
            <Feedback
              title='Feedback'
              desc='Use this page to view user feedback in realtime'
              apiHello='/admin/feedback'
              apiClear='/admin/feedback/clear'
            />}
        />
        <Route
          path='/admin/visualise' render={() =>
            <Visualise
              title='Visuals'
              desc='Use this page to control the visualisations in realtime'
              apiHello='/admin/visualise'
              apiVisualiseNum='/admin/visualise/num'
              apiDurationChange='/admin/visualise/duration'
              apiScrollerChange='/admin/visualise/scroller'
            />}
        />
        <Redirect to='/admin' />
      </Switch>
    </div>)
}
export default RoutesAdmin
