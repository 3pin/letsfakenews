import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from '../../actions/feedbackCreator';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  feedback: state.feedbackReducer.feedback,
  submitting: state.feedbackReducer.submitting,
  room: state.roomReducer.room,
});
// which props do we want to update, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  submitStarted: () => {
    dispatch(actions.submitStarted());
  },
  submit: (feedback, room, history) => {
    dispatch(actions.submit(feedback, room, history));
  },
});
class WriteFeedback extends React.Component {
  onHandleSubmit = (feedback) => {
    /* dipatch action to change button-UI */
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(feedback, this.props.room, this.props.history);
  };

  render() {
    console.log(this.props);
    return (
      <div>
        <section>
          <FrameBanner
            title="Feedback"
            desc="Please give us feedback on your experience using this service"
          />
          <hr />
          <FrameForm
            rows="2"
            minLength="10"
            maxLength="140"
            content={this.props.feedback}
            submitting={this.props.submitting}
            handleSubmit={this.onHandleSubmit}
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteFeedback));
