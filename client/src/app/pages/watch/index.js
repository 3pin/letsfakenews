import React from 'react'
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom'

import Landing from './landing'
import visualiseNews from './news_P5'
import visualiseText from './text_p5'
import visualiseImages from './images_p5'

const RoutesWatch = () => {
  return (
    <div className='layout'>
      <Switch>
        <Route exact path='/watch' component={Landing} />
        <Route path='/watch/news' component={visualiseNews} />
        <Route path='/watch/text' component={visualiseText} />
        <Route path='/watch/images' component={visualiseImages} />
        <Redirect to='/watch' />
      </Switch>
    </div>)
}
export default RoutesWatch
