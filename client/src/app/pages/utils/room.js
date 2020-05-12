import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from '../../actions/joinRoom';

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
class Room extends React.Component {
  onHandleSubmit = (content) => {
    /* dipatch action to change button-UI to greyed out*/
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(content, this.props.history);
  }

  render() {
    console.log(this.props.room);
    return (
      <div>
        <section>
          <FrameBanner
            title="Select a room"
            desc="Welcome to LetsFakeNews, where you write fake-news on your phone then watch with friends on a screen. To start, input your local news-room (use 'public' if you're a visitor)."
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Room));
