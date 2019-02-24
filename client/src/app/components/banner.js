import React from 'react';

export default class BannerFrame extends React.Component {
  render() {
    return (<div>
      <h3>{this.props.title}</h3>
      <p>{this.props.desc}</p>
    </div>)
  }
}
