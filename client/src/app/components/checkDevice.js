// HOC... take a protected component,
// ... and if client has valid token passes the component,
// ... if not redirects them to login
import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

export default function checkDevice(ComponentToProtect) {
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
      axios.get('/settings/checkDevice').then((response) => {
        console.log(response.data.message);
        this.setState({
          loading: false,
        });
      }).catch((err) => {
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
        return <Redirect to="/role" />;
      }
      return (
        <>
          <ComponentToProtect {...this.props} /> <
        />
      );
    }
  };
}
