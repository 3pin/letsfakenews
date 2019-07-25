import React from 'react';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';

class writeFeedback extends React.Component {
  componentDidMount() {
    //console.log(this.props);
  }
  render() {
    return (<div>
      <section>
        <FrameBanner
          title="Give your feedback..."
          desc="Give us your response to writing & watching fake-news with us"/>
        <hr/>
        <FrameForm
          subject="feedback"
          stateToSubmit={["feedback"]}
          apiEndPoint="/write/feedback"
          redirect="/write/thankyou"
          currentPathname="/write/feedback"
          rows="4"
          minLength="5"
          maxLength="280"
          processing={this.state.processing}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}/>
        <hr/>
      </section>
    </div>)
  }
}
export default writeFeedback
