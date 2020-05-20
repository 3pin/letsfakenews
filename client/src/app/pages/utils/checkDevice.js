// HOC... take a protected component,
// ... and if client has valid token passes the component,
// ... if not redirects them to login
import React from 'react';
import {
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import { store } from '../../store';

export default function checkDevice(ComponentToProtect) {
  // grab current state
  const state = store.getState();
  const { room } = state.roomReducer;

  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        apiHello: '/settings/checkDevice',
        loading: true,
        redirect: false,
        room,
      };
    }

    componentDidMount() {
      //
      console.log(this.props);
      console.log(this.state);
      /* load autolive-status & stories from db */
      axios.get(this.state.apiHello, {
        params: {
          room,
        },
      }).then((response) => {
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
          <ComponentToProtect {...this.props} />
        < />
      );
    }
  };
}
