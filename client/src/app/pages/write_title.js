import React from 'react';

import BannerFrame from '../../app/components/banner';
import FormFrame from '../../app/components/form';

export default class Title extends React.Component {
  handleChange(e) {
    //console.log(`write_story event: ${e}`);
    this.props.handleChange([this.props.subject,e]);
  }
  handleSubmit() {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }
  render() {
    return (<div>
      <section>
      <BannerFrame title="Write a title..." desc="Make up a ridiculous title for your story"/>
      <FormFrame
      subject={this.props.subject}
      value={this.props.value}
      handleChange={this.handleChange.bind(this)}
      handleSubmit={this.handleSubmit.bind(this)}
      rows="1" length="25" linkto={this.props.linkto}
      />
      </section>
      <hr/>
    </div>)
  }
}
