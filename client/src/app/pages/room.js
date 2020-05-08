import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';

import FrameBanner from '../components/frameBanner';
import FrameForm from '../components/frameForm';
import * as actions from '../actions/joinRoom';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
  submitting: state.roomReducer.submitting,
});
// / which props do we want to update, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  submitStarted: () => {
    dispatch(actions.submitStarted());
  },
  submit: (room, history) => {
    dispatch(actions.submit(room, history));
  },
});
class Room extends React.Component {
  onHandleSubmit = (room) => {
    /* dipatch action to change button-UI to greyed out*/
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(room, this.props.history);
  }

  render() {
    console.log(this.props.room);
    return (
      <div>
        <section>
          <FrameBanner
            title="Room..."
            desc="Welcome to LetsFakeNews, broadcasted live by El-Jazeera. Write fake-news on your phone, then watch it live with friends on a shared screen."
          />
          <hr />
          <FrameForm
            desc="Input your room's ID? (use 'public' for general access)"
            rows="1"
            minLength="3"
            maxLength="10"
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
