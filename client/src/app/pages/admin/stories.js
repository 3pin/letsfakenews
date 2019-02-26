import React from 'react';

import BannerFrame from '../../../app/components/banner';
import TableOps from '../../../app/components/table_ops';

export default class Stories extends React.Component {

  render() {
    const tHeaders = ['Command','Action']
    return (<div>
      <BannerFrame desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <p>Feedback db goes here</p>

      <TableOps
      tHeaders={tHeaders}
      tButtons={["checkbox,", "blue", "red"]}
      tRows={["Set new stories to go live automatically", "Refresh imagery for all stories", "Clear all stories from database"]}
      />
    </div>)
  }
}
