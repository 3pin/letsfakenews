import React from 'react';

import BannerFrame from '../../../app/components/banner';
//import TableOps from '../../../app/components/table_ops';

export default class Stories extends React.Component {
  render() {
    return (<div>
      <BannerFrame desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <p>Feedback db goes here</p>
    </div>)
  }
}
