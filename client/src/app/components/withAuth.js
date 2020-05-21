// HOC... take a protected component,
// ... and if client has valid token passes the component,
// ... if not redirects them to login
import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import {
  store
} from '../store';

export default function withAuth(ComponentToProtect) {
  // grab current state
  const state = store.getState();
  const {
    room
  } = state.roomReducer;

  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        apiHello: '/settings/checkToken',
        loading: true,
        redirect: false,
        room,
      };
    }

    componentDidMount() {
      //
      /* load autolive-status & stories from db */
      axios.get(this.state.apiHello, {
        params: {
          room,
        },
      }).then(() => {
        console.log('redirecting');
        this.setState({
          loading: false,
        });
      }).catch((err) => {
        console.log(JSON.stringify(err.response.data.message));
        // alert(err.response.data.message);
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
        return <Redirect to="/errorauth" />;
      }
      return (
        <>
          <ComponentToProtect {...this.props} /> <
        />
      );
    }
  };
}
