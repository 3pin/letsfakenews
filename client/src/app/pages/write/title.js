import React from 'react';
import {
  connect,
} from 'react-redux';
import {
  withRouter,
} from 'react-router-dom';
import * as actions from '../../actions/creatingNews';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  title: state.newsReducer.title,
});
/* which props do we want to inject, given the global store state? */
const mapDispatchToProps = (dispatch) => ({
  updateStore: (title, history) => {
    dispatch(actions.updateTitle(title, history));
  },
});
class WriteTitle extends React.Component {
  onHandleSubmit = (title) => {
    /* goto the next page */
    // this.props.history.push(this.state.next)
    /* update the store */
    this.props.updateStore(title, this.props.history);
  }

  render() {
    return (
      <div>
        <section>
          <FrameBanner
            title="Add a title..."
            desc="Give your fake-story a title"
          />
          <hr />
          <FrameForm
            rows="1"
            minLength="5"
            maxLength="25"
            buttonLabel="Review"
            content={this.props.title}
            handleSubmit={this.onHandleSubmit}
          />
          <hr />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteTitle));
