import React from 'react';

import BannerFrame from '../../../app/components/banner';
import FormFrame from '../../../app/components/form';

export default class Story extends React.Component {
  componentDidMount() {
    console.log('state...');
    console.log(this.state);
    console.log('props...');
    console.log(this.props);
    console.log('\n');
  }
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
        <BannerFrame hsize='h4' title={this.props.title} desc={this.props.desc}/>
        <hr/>
        <FormFrame rows={this.props.rows} length={this.props.length} linkto={this.props.linkto} value={this.props.value} handleChange={this.handleChange.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
        <hr/>
      </section>
    </div>)
  }
}
