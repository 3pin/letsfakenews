// HOC... take a protected component,
// ... and if client has valid token passes the component,
// ... if not redirects them to login
import React from 'react';
import {
  Redirect,
} from 'react-router-dom';

export default function withAuth(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      fetch('/settings/checkToken')
        .then((res) => {
          if (res.status === 200) {
            this.setState({
              loading: false,
            });
          } else {
            console.log('redirecting');
            this.setState({
              loading: false,
              redirect: true,
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    render() {
      if (this.state.loading) {
        return null;
      }
      if (this.state.redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <>
          <ComponentToProtect {...this.props} />
        </>
      );
    }
  };
}
