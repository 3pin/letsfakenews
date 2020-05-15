// HOC... take a protected component,
// ... and if client has valid token passes the component,
// ... if not redirects them to login
import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

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
      //
      /* load autolive-status & stories from db */
      axios.get('/settings/checkToken').then(() => {
        console.log('redirecting');
        this.setState({
          loading: false,
        });
      }).catch((err) => {
        console.log(JSON.stringify(err.response.data.message));
        alert(err.response.data.message);
        this.setState({
          loading: false,
          redirect: true,
        });
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
