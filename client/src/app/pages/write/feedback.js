import React from 'react';

import Writing from '../../components/writing';

export default class writeFeedback extends React.Component {
  componentDidMount() {
    //console.log(this.props);
}
  render() {
    return (<div>
      <section>
        <Writing
          title="Give your feedback..."
          desc="Give us your response to writing & watching fake-news with us"
          rows="4" length="280"
          subject="feedback"
          apiEndPoint="/write/feedback"
          stateToSubmit={["feedback"]}
          redirect="/write/thankyou"
          />
      </section>
    </div>)
  }
}
