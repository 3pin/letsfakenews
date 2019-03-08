import React from 'react';
// bootstrap
import {Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";
//
export default class IndexLanding extends React.Component {
  render() {
    //console.log(this.props);
    const links = this.props.links;
    const linksFrame = links.map((entry, i) => <LinkContainer activeClassName="active" key={i} to={`/${entry}`}><Nav.Link>{entry}</Nav.Link></LinkContainer>);

    return (<div>
      <Navbar bg="light" variant="light" expand="md">
        <LinkContainer to={this.props.title}>
          <a className="navbar-brand" href="/">{this.props.title}</a>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {linksFrame}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>)
  }
}
