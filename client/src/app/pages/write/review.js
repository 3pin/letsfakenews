import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../../actions/creatingNews";

import FrameBanner from "../../../app/components/frameBanner";
import FrameButton from "../../../app/components/frameButton";

// which props do we want to inject, given the global store state?
const mapStateToProps = state => {
  return {
    story: state.newsReducer.story,
    title: state.newsReducer.title,
    submitting: state.newsReducer.submitting
  };
};
// which props do we want to inject, given the global store state?
const mapDispatchToProps = dispatch => {
  return {
    submitStarted: () => {
      dispatch(actions.submitStarted());
    },
    submit: (story, title, history) => {
      dispatch(actions.submit(story, title, history));
    }
  };
};
class Review extends React.Component {
  handleClick = () => {
    /* dipatch action to change button-UI */
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(this.props.story, this.props.title, this.props.history);
  };
  render() {
    let title = "TITLE: " + this.props.title;
    let story = "STORY: " + this.props.story;
    return (
      <div>
        <section>
          <FrameBanner
            title="Review..."
            desc="Choose whether to submit or update your fake-story?"
          />
          <hr />
          <p>
            {title}
            <br />
            {story}
          </p>
          <FrameButton
            variant="primary"
            submitting={this.props.submitting}
            onClick={this.handleClick}
          />
          <hr />
          <FrameButton
            variant="secondary"
            linkto={"/write/story"}
            buttonLabel={"Update"}
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Review));
