import React from 'react';

import BannerFrame from '../../../app/components/banner';

export default class Watch extends React.Component {

  render() {
    //const tHeaders = ['Command','Action']
    return (<div>
      <BannerFrame desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <p>WatchDisplay goes here</p>
    </div>)
  }
}
