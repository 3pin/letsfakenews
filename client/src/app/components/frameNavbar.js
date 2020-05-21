import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//
export default class FrameNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navExpanded: false,
    };
  }

  getInitialState() {
    return {
      navExpanded: false,
    };
  }

  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  closeNav() {
    this.setState({ navExpanded: false });
  }

  render() {
    const { links } = this.props;
    const linksFrame = links.map((entry, i) => <LinkContainer activeClassName="active" key={i} to={`/${entry}`}><Nav.Link>{entry}</Nav.Link></LinkContainer>);
    return (<div>
      <Navbar fixed="top" align="right" bg="light" variant="light" expand="md" onToggle={this.setNavExpanded.bind(this)} expanded={this.state.navExpanded}>
        <LinkContainer to="/">
          <a className="navbar-brand" href="/">{this.props.title}</a>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" onSelect={this.closeNav.bind(this)}>
            {linksFrame}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>)
  }
}
