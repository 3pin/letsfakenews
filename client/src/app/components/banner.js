import React from 'react';

export default class Banner extends React.Component {
  render() {
    return (<div>
      <h3>{this.props.title}</h3>
      <p>{this.props.desc}</p>
      <hr/>
    </div>)
  }
}
