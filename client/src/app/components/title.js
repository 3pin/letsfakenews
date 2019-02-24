import React from 'react';

export default class TitleFrame extends React.Component {
  render() {
    return (<div>
      <h2>{this.props.title}</h2>
    </div>)
  }
}
