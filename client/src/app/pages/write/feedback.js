import React from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from "react-router-dom"

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from "../../actions/creatingFeedback"

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  return {
    feedback: state.feedbackReducer.feedback,
    submitting: state.feedbackReducer.submitting
  };
}
/// which props do we want to inject, given the global store state?
const mapDispatchToProps = (dispatch) => {
  return {
    submitStarted: () => {
      dispatch(actions.submitStarted())
    },
    submit: (feedback, history) => {
      dispatch(actions.submit(feedback, history))
    }
  }
}
class WriteFeedback extends React.Component {
  state = {
    current: "/write/feedback",
    next: "/write/thankyou",
    rows: "4",
    minLength: "5",
    maxLength: "280"
  }
  handleSubmit = (feedback) => {
    /* dipatch action to change button-UI */
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(feedback, this.props.history);
  }
  render() {
    console.log(this.props)
    return (<div>
        <section>
          <FrameBanner
            title="Feedback..."
            desc="Give your thoughts on using this fake-news service"/>
          <hr/>
          <FrameForm
            rows={this.state.rows}
            minLength={this.state.minLength}
            maxLength={this.state.maxLength}
            content={this.props.feedback}
            submitting={this.props.submitting}
            handleSubmit={this.handleSubmit}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteFeedback))
