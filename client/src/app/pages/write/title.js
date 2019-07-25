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
    title: state.title,
    submitting: state.submitting
  };
}
// which props do we want to inject, given the global store state?
function mapDispatchToProps(dispatch) {
  return {
    onChange: (value) => {
      console.log('mapDispatchToProps')
      const action = {
        type: 'updateTitle',
        payload: value
      }
      dispatch(action);
    }
  };
}

class WriteTitle extends React.Component {
  componentDidMount() {
    //action listeners
    store.subscribe(() => {
      console.log(store.getState());
    })
  }
  handleSubmit = (title) => {
    console.log('title-form was submitted: ' + title)
    store.dispatch({type: "updateTitle", payload: title})
  }
  render() {
    /*
    subject="title"
    stateToSubmit={["story","title"]}
    */
    return (<div>
      <section>
        <FrameBanner
          title="Add a title..."
          desc="Give your story a title"/>
        <hr/>
        <FrameForm
          currentPathname="/write/title"
          rows="1"
          minLength="5"
          maxLength="25"
          redirect="/write/thankyou"
          apiEndPoint="/write/news"
          handleSubmit={this.handleSubmit}/>
        <hr/>
      </section>
    </div>)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(WriteTitle);
