import React from 'react';
import {
  connect
} from 'react-redux';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import store from "../../../app/store";

// which props do we want to inject, given the global store state?
function mapStateToProps(state) {
  console.log('mapStateToProps', state)
  return {
    story: state.story
  };
}
// which props do we want to inject, given the global store state?
function mapDispatchToProps(dispatch) {
  return {
    onChange: (value) => {
      console.log('mapDispatchToProps')
      const action = {
        type: 'updateStory',
        payload: value
      }
      dispatch(action);
    }
  };
}
class WriteStory extends React.Component {
  state = {
    submitting: false
  }
  handleSubmit = (story) => {
    console.log("form submitted")
    let minLength = "5"
    console.log('story-form was submitted: ' + story)
    if (story.length >= minLength) {
      console.log("form content long enough")
      this.props.history.push("/write/title")
      store.dispatch({type: "updateStory", payload: story})
    } else {
      console.log("form content NOT long enough")
      window.alert('What you wrote is too short')
      this.props.history.push("/write/story")
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
            currentPathname="/write/story"
            buttonLabel="Next"
            rows="4"
            minLength="5"
            maxLength="280"
            linkto="/write/title"
            submitting={this.state.submitting}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteStory);
