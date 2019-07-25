import React from 'react';
import {
  connect
} from 'react-redux';
import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => {
  return {
    story: state.newsReducer.story
  };
}
// which props do we want to inject, given the global store state?
const mapDispatchToProps = (dispatch) => {
  return {
    updateStore: (content) => {dispatch({type: 'UPDATE_STORY', payload: content})}
  }
}
class WriteStory extends React.Component {
  state = {
    submitting: false,
    current: "/write/story",
    next: "/write/title",
    minLength: "5"
  }
  handleSubmit = (story) => {
    if (story.length >= this.state.minLength) {
      this.props.updateStore(story)
      this.props.history.push(this.state.next)
    } else {
      window.alert('What you wrote is too short')
      this.props.history.push(this.state.current)
    }
  }
  render() {
    console.log(this.props)
    return (<div>
        <section>
          <FrameBanner
            title="Write a story..."
            desc="Make up a fake-news story"/>
          <hr/>
          <FrameForm
            content={this.props.story}
            currentPathname="/write/story"
            buttonLabel="Next"
            rows="4"
            minLength="5"
            maxLength="280"
            submitting={this.state.submitting}
            handleSubmit={this.handleSubmit}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteStory);
