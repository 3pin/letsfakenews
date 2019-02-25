import React from 'react';

import BannerFrame from './banner';
import FormFrame from './form';

export default class Story extends React.Component {
  handleChange(value) {
    //console.log(e.target.value);
    let key = this.props.subject
    this.props.handleChange(key, value);
    // update localStorage
    localStorage.setItem(key, value);
  }
  handleSubmit() {
    if (this.props.handleSubmit) {
      this.props.handleSubmit();
    }
  }
  render() {
    return (<div>
      <section>
        <BannerFrame title={this.props.title} desc={this.props.desc}/>
        <hr/>
        <FormFrame rows={this.props.rows} length={this.props.length} linkto={this.props.linkto} value={this.props.value} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        <hr/>
      </section>
    </div>)
  }
}
