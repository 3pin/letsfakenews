import React from 'react';
import {
  connect
} from 'react-redux';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import {updateStory} from "../../actions/creatingNews"
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
        type: 'UPDATE_STORY',
        payload: value
      }
      dispatch(action);
    }
  };
}
class WriteStory extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(story) {
    console.log(story)
    updateStory(story)
    store.dispatch({type: "updateStory", payload: story})
  }
  handleSubmit(story) {
    console.log('story-form was submitted: ' + story)
    updateStory(story)
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
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteStory);
