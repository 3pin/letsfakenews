import React from 'react';
// bootstrap
import {Navbar, Nav} from 'react-bootstrap';
//
export default class IndexLanding extends React.Component {
  render() {
    const navlinksData = [
      {
        to: "/",
        label: "Home"
      }, {
        to: "/write",
        label: "Write"
      }, {
        to: "/watch",
        label: "Watch"
      }, {
        to: "/admin",
        label: "Admin"
      }
    ];
    const Output = navlinksData.map((entry, i) => <Nav.Link key={i} href={entry.to}>{entry.label}&nbsp;</Nav.Link>);
    //
    return (<div>
      <Navbar bg="light" variant="light" expand="md">
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {Output}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>)
  }
}
