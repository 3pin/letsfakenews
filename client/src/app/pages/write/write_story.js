import React from 'react';

import BannerFrame from '../../../app/components/banner';
import FormFrame from '../../../app/components/form';

export default class Story extends React.Component {
  handleChange(e) {
    //console.log(e);
    //console.log(JSON.stringify(e));
    this.props.handleChange(JSON.stringify(e));
  }
  render() {
    return (<div>
      <section>
        <BannerFrame title="Write a story..." desc="Make up a ridiculous fake-news story"/>
        <hr/>
        <FormFrame rows="4" length="280" linkto={this.props.linkto} subject={this.props.subject} value={this.props.value} handleChange={this.handleChange.bind(this)}/>
        <hr/>
      </section>
    </div>)
  }
}
