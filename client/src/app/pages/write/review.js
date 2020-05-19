import React from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';

import * as actions from '../../actions/creatingNews';

import FrameBanner from '../../components/frameBanner';
import FrameButton from '../../components/frameButton';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  story: state.newsReducer.story,
  title: state.newsReducer.title,
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
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  handleClick = () => {
    /* dipatch action to change button-UI */
    this.props.submitStarted();
    /* dispatch API submit action */
    this.props.submit(this.props.story, this.props.title, this.props.room, this.props.history);
  };
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleClick();
    }
  }
  // change code below this line
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  render() {
    const title = `Title: ${this.props.title}`;
    const story = `Story: ${this.props.story}`;
    console.log(this.props);
    // let title = "TITLE: " + this.props.title;
    // let story = "STORY: " + this.props.story;
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
          <hr />
          <FrameButton
            variant="secondary"
            linkto="/write/story"
            buttonLabel="Update"
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps, )(withRouter(Review));
