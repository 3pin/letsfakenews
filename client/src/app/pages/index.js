import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  Container,
  Row,
  Col,
} from 'react-bootstrap';

// middleware
import withAuth from '../components/withAuth';
import checkDevice from '../components/checkDevice';
// pages
import Intro from './intro';
import Room from './utils/room';
import Role from './utils/role';
import RoutesWrite from './write';
import RoutesAdmin from './admin';
import RoutesWatch from './watch';
import Login from './utils/login';
// components
import Logout from '../components/logout';
import FrameNavbar from '../components/frameNavbar';
import FrameFooter from '../components/frameFooter';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  buttonText: state.loginReducer.buttonText,
  room: state.roomReducer.room,
});

class Routes extends React.Component {
  /*
  constructor() {
    super();
    this.onUnload = this.onUnload.bind(this);
  }

  onUnload() {
    console.log(this.room);
    alert('page Refreshed');
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onUnload());
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onUnload());
  }
  */

  render() {
    return (
      <Container as="main">
        <FrameNavbar className="navbar" title="LetsFakeNews" links={['Room', 'Role', 'Write', 'Watch', 'Admin', this.props.buttonText]} />
        <Row>
          <Col as="aside" xs={0} sm={1} md={1} lg={1} xl={1} />
          <Col as="article" xs={12} sm={10} md={10} lg={10} xl={10}>
            <Switch>
              <Route exact path="/" component={Intro} />
              <Route path="/room" component={Room} />
              <Route path="/role" component={Role} />
              <Route path="/write" component={RoutesWrite} />
              <Route path="/watch" component={checkDevice(RoutesWatch)} />
              <Route path="/admin" component={withAuth(RoutesAdmin)} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Redirect to="/room" />
            </Switch>
            <FrameFooter />
          </Col>
          <Col as="aside" xs={0} sm={1} md={1} lg={1} xl={1} />
        </Row>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Routes);
