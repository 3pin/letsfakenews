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
    console.log('feedback about to be tested')
    if (feedback.length >= this.state.minLength) {
      console.log('feedback long enough')
      this.props.submitStarted();
      this.props.submit(feedback, this.props.history);
    } else {
      window.alert('What you wrote is too short')
      this.props.history.push(this.state.current)
    }
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
