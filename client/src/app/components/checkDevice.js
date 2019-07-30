// HOC... take a protected component,
// ... and if client has valid token passes the component,
// ... if not redirects them to login
import React from 'react';
import {
  Redirect
} from 'react-router-dom';

export default function checkDevice(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }
    componentDidMount() {
      fetch('/settings/checkDevice')
        .then(res => {
          if (res.status === 200) {
            console.log('This is a Desktop device');
            this.setState({
              loading: false
            });
          } else {
            console.log('Redirecting... This is NOT a Desktop device');
            this.setState({
              loading: false,
              redirect: true
            });
            alert("Only desktop browsers can access the LetsFakeNews service");
            //const error = new Error(res.error);
            //throw error;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
    render() {
      if (this.state.loading) {
        return null;
      }
      if (this.state.redirect) {
        return <Redirect to="/landing"/>;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
