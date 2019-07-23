import React from 'react';

export default class BannerFrame extends React.Component {
  render() {
    let Tag
    if (this.props.hsize) {
      Tag = this.props.hsize
    } else {
      Tag = "h3"
    }
    return (<div>
      <Tag>{this.props.title}</Tag>
      <p>{this.props.desc}</p>
    </div>);
  }
}
