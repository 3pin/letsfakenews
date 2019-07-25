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
    submitting: false,
    current: "/write/story",
    next: "/write/title",
    minLength: "5"
  }
  handleSubmit = (content) => {
    if (content.length >= this.state.minLength) {
      this.props.history.push(this.state.next)
      store.dispatch({type: "updateStory", payload: content})
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
