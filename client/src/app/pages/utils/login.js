// Login... user logins then backend verifies credentials
import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  Form,
  Button,
} from 'react-bootstrap';
import {
  withRouter,
} from 'react-router-dom';

import FrameBanner from '../../components/frameBanner';

import * as actions from '../../actions/loginCreator';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});
// which props do we want to update, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  submit: (data, room, history) => {
    dispatch(actions.submit(data, room, history));
  },
});

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    // this.nameInput.focus()
  }

  handleChange(event) {
    const {
      value,
      name,
    } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      room,
    } = this.props;
    const data = this.state;
    /* dispatch API submit action */
    this.props.submit(data, room, this.props.history);
  }

  render() {
    return (
      <div>
        <FrameBanner
          title="Login"
          desc="Moderator access requires login..."
        />
        <hr />
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <input
            ref={(input) => {
              this.nameInput = input;
            }}
            autoFocus
            type="username"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleChange.bind(this)}
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleChange.bind(this)}
            required
          />
          <br />
          <br />
          <Button type="submit">
            Submit
          </Button>
        </Form>
        <hr />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
