import React from 'react';
import {
  Redirect
} from "react-router-dom";
import {
  connect,
} from 'react-redux';
import {
  withCookies,
  Cookies
} from 'react-cookie';
import {
  instanceOf
} from 'prop-types';
import * as actions from '../../actions/loginCreator';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  buttonText: state.loginReducer.buttonText,
});
// which props do we want to update, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  logoutSuccess: () => {
    dispatch(actions.logoutSuccess());
  },
});

class InnerLogout extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  componentDidMount() {
    const {
      cookies
    } = this.props;
    cookies.remove('token');
    this.props.logoutSuccess();
  }

  render() {
    return (
      <Redirect to={'/room'} />
    );
  }
}

// export default withCookies(Logout);
const Logout = withCookies(InnerLogout);
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
