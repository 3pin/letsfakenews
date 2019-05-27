// REACT JS
import '../node_modules/react/cjs/react.production.min.js';
import '../node_modules/react-dom/cjs/react-dom.production.min.js';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
// styles
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './minimum.css';

import React from 'react';
import ReactDOM from 'react-dom';
import HashRouter from 'react-router-dom/HashRouter';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';

import Routes from './app/routes';

const App = () => (
  <Container as='main'>
    <Row>
      <Col as='aside' xs={1} sm={1} md={1} lg={1} xl={1}/>
      <Col as='article' xs={10} sm={10} md={10} lg={10} xl={10}>
        <HashRouter>
          <Routes/>
        </HashRouter>
      </Col>
      <Col as='aside' xs={1} sm={1} md={1} lg={1} xl={1}/>
    </Row>
  </Container>
);

ReactDOM.render(<App/>, document.getElementById('react'));
