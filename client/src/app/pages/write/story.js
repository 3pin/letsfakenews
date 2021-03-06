import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from '../../actions/newsCreator';

/* which props do we want to inject, given the global store state? */
const mapStateToProps = (state) => ({
  story: state.newsReducer.story,
});
/* which props do we want to inject, given the global store state? */
const mapDispatchToProps = (dispatch) => ({
  updateStore: (story, history) => {
    dispatch(actions.updateStory(story, history));
  },
});
class WriteStory extends React.Component {
  onHandleSubmit = (story) => {
    /* goto the next page */
    // this.props.history.push(this.state.next)
    /* update the store */
    this.props.updateStore(story, this.props.history);
  }

  render() {
    return (
      <div>
        <section>
          <FrameBanner
            title="Write a story"
            desc="Story length must be 100-140 chars"
          />
          <FrameForm
            rows="2"
            minLength="100"
            maxLength="140"
            buttonLabel="Next"
            content={this.props.story}
            handleSubmit={this.onHandleSubmit}
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteStory));
