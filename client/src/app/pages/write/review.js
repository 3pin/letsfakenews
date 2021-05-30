import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';

import * as actions from '../../actions/newsCreator';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  story: state.newsReducer.story,
  title: state.newsReducer.title,
  error: state.newsReducer.error,
  submitting: state.newsReducer.submitting,
  room: state.roomReducer.room,
});
// which props do we want to inject, given the global store state?
const mapDispatchToProps = (dispatch) => ({
  submitStarted: () => {
    dispatch(actions.submitStarted());
  },
  submit: (story, title, room, history) => {
    dispatch(actions.submit(story, title, room, history));
  },
});
class Review extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    /* dipatch action to change button-UI */
    console.log('handleClick');
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(this.props.story, this.props.title, this.props.room, this.props.history);
  }

  render() {
    const title = `Title: ${this.props.title}`;
    const story = `Story: ${this.props.story}`;
    console.log(this.props);
    return (
      <div>
        <section>
          <FrameBanner
            title="Review your news"
            desc="Happy with your fake-news?"
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
          <FrameButton
            variant="secondary"
            buttonLabel="Go Back"
            linkto="/write/story"
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Review));
