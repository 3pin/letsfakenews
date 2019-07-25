import React from 'react';
import {
  connect
} from 'react-redux';
import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import * as actions from "../../actions/creatingNews"

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  return {
    story: state.newsReducer.story
  };
}
// which props do we want to inject, given the global store state?
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (story) => {dispatch(actions.updateStory(story))}
  }
}
class WriteStory extends React.Component {
  state = {
    current: "/write/story",
    next: "/write/title",
    rows: "4",
    minLength: "6",
    maxLength: "280"
  }
  handleSubmit = (story) => {
    if (story.length >= this.state.minLength) {
      //update the store
      this.props.updateStore(story)
      //goto the next page
      this.props.history.push(this.state.next)
    } else {
      window.alert('What you wrote is too short')
      this.props.history.push(this.state.current)
    }
  }
  render() {
    return (<div>
        <section>
          <FrameBanner
            title="Write a story..."
            desc="Make up a fake-news story"/>
          <hr/>
          <FrameForm
            rows={this.state.rows}
            minLength={this.state.minLength}
            maxLength={this.state.maxLength}
            content={this.props.story}
            buttonLabel="Next"
            handleSubmit={this.handleSubmit}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteStory);
