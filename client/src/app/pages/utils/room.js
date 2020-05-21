import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import {
  withCookies,
  Cookies
} from 'react-cookie';
import {
  instanceOf
} from 'prop-types';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from '../../actions/roomCreator';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
  submitting: state.roomReducer.submitting,
});
// which props do we want to update, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  submitStarted: () => {
    dispatch(actions.submitStarted());
  },
  submit: (room, history) => {
    dispatch(actions.submit(room, history));
  },
});
class InnerRoom extends React.Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      room: this.props.room,
    }
  }

  onHandleSubmit = (content) => {
    /* dipatch action to change button-UI to greyed out*/
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(content, this.props.history);
  }

  componentDidMount() {
    const {
      cookies
    } = this.props;
    try {
      cookies.remove('token');
      console.log("Removed cookie named 'token'");
    } catch (err) {
      console.log("No cookie named 'token' present");
    }
  }

  render() {
    console.log(this.props.room);
    return (
      <div>
        <section>
          <FrameBanner
            title="Select a room"
            desc="Welcome to LetsFakeNews, where you write fake-news on your phone then watch with friends on a screen. To start, choose a news-room (use 'Public' if you're a visitor)."
          />
          <hr />
          <FrameForm
            rows="1"
            minLength="3"
            maxLength="10"
            type= "password"
            content = {this.props.room}
            handleSubmit={this.onHandleSubmit}
          />
          <hr />
        </section>
      </div>
    );
  }
}
const Room = withCookies(InnerRoom);
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Room));
