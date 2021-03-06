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
            title="Welcome"
            desc="Would you like to write a fake news report for El-Jazeera, then watch it broadcast live to the world?"
            desc2="To write a news report use this webapp on your phone. To watch El-Jazeera live, setup this webapp on a laptop or projector."
            desc3="To get started enter your event's private news-room, or for a demo simply enter the ‘Public’ one."
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
