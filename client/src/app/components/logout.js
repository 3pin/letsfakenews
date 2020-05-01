import React from 'react';
import { Redirect } from "react-router-dom";
import {
  withCookies,
  Cookies
} from 'react-cookie';
import {
  instanceOf
} from 'prop-types';

class Logout extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { cookies } = this.props;
    cookies.remove('token');
  }

  render() {
    return (
      <Redirect to={'/landing'} />
    );
  }
}

export default withCookies(Logout);
