import React from 'react';

import BannerFrame from '../../../app/components/banner';
import FormFrame from '../../../app/components/form';

export default class Title extends React.Component {
  handleChange(e) {
    //console.log(e);
    //console.log(JSON.stringify(e));
    this.props.handleChange(JSON.stringify(e));
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
        <hr/>
        <FormFrame subject={this.props.subject} value={this.props.value} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)} rows="1" length="25" linkto={this.props.linkto}/>
        <hr/>
      </section>
    </div>)
  }
}
