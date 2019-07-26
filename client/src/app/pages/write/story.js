import React from 'react';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from "react-router-dom"
import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from "../../actions/creatingNews"

/* which props do we want to inject, given the global store state? */
const mapStateToProps = (state) => {
  return {
    story: state.newsReducer.story,
  };
}
/* which props do we want to inject, given the global store state? */
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (story, history) => {
      dispatch(actions.updateStory(story, history))
    }
  }
}
class WriteStory extends React.Component {
  handleSubmit = (story) => {
    /* goto the next page */
    //this.props.history.push(this.state.next)
    /* update the store */
    this.props.updateStore(story, this.props.history)
  }
  render() {
    return (<div>
        <section>
          <FrameBanner
            title="Write a story..."
            desc="Make up a fake-news story"/>
          <hr/>
          <FrameForm
            rows="2"
            minLength="5"
            maxLength="280"
            buttonLabel="Next"
            content={this.props.story}
            handleSubmit={this.handleSubmit}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WriteStory))
