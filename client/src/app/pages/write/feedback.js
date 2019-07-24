import React from 'react';
import BannerFrame from '../../components/bannerframe';
import FormFrame from '../../components/formframe';

export default class writeFeedback extends React.Component {
  componentDidMount() {
    //console.log(this.props);
  }
  render() {
    return (<div>
      <section>
        <BannerFrame
          title="Give your feedback..."
          desc="Give us your response to writing & watching fake-news with us"/>
        <hr/>
        <FormFrame
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
