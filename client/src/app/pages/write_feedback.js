import React from 'react';

import BannerFrame from '../../app/components/banner';
import FormFrame from '../../app/components/form';

export default class Feedback extends React.Component {
  handleChange(e) {
    //console.log(`write_story event: ${e}`);
    this.props.handleChange([this.props.subject,e]);
  }
  //suppress submit if form-action came from the write_story-frame... only accept from write_title-frame
  handleSubmit() {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }
  render() {
    return (<div>
      <section>
        <BannerFrame title="Write your feedback..." desc="Give us your response to writing & watching fake-news with us"/>
        <FormFrame rows="4" length="280"
        linkto={this.props.linkto}
        subject={this.props.subject}
        value={this.props.value}
        handleChange={this.handleChange.bind(this)}
        handleSubmit={this.handleSubmit.bind(this)}
        />
      </section>
    </div>)
  }
}
