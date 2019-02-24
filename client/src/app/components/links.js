import React from 'react';
import {Link} from 'react-router-dom';

export default class LinksFrame extends React.Component {
  render() {
    return (<div>
      <Link to="/">Home &nbsp;</Link>
      <Link to="/write">Write &nbsp;</Link>
      <Link to="/admin">Admin &nbsp;</Link>
      <Link to="/watch">Watch &nbsp;</Link>
    </div>)
  }
}
