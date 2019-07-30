import React from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
// middleware
import withAuth from '.././components/withAuth';
import checkDevice from '.././components/checkDevice';
// pages
import Intro from './intro';
import Landing from './landing';
import RoutesWrite from './write/routes';
import RoutesAdmin from './admin/routes';
import RoutesWatch from './watch/routes';
import Login from './admin/login';
// components
import FrameNavbar from '.././components/frameNavbar';

const Routes = () => {
  return (
    <Container as='main'>
        <FrameNavbar className="navbar" title="LetsFakeNews" links={["home", "write", "watch", "admin"]}/>
        <Row>
          <Col as='aside' xs={0} sm={1} md={1} lg={1} xl={1}/>
          <Col as='article' xs={12} sm={10} md={10} lg={10} xl={10}>
            <Switch>
              <Route exact path='/' component={Intro}/>
              <Route path='/landing' component={Landing}/>
              <Route path='/write' component={RoutesWrite}/>
              <Route path='/watch' component={checkDevice(RoutesWatch)}/>
              <Route path='/admin' component={withAuth(RoutesAdmin)}/>
              <Route path='/login' component={Login}/>
              <Redirect to="/landing"/>
            </Switch>
          </Col>
          <Col as='aside' xs={0} sm={1} md={1} lg={1} xl={1}/>
        </Row>
      </Container>
  )
}
export default Routes
