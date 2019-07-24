import React from 'react';
import BannerFrame from '../../components/bannerframe';
import FormFrame from '../../components/formframe';

export default class Story extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    this.setState({
      [this.props.subject]: value
    });
  }
  render() {
    return (<div>
        <section>
          <BannerFrame
            title="Write a story..."
            desc="Make up a fake-news story"/>
          <hr/>
          <FormFrame
            subject='story'
            currentPathname="/write/story"
            buttonLabel="Next"
            rows="4"
            minLength="80"
            maxLength="280"
            linkto="/write/title"
            handleChange={this.handleChange.bind(this)}/>
          <hr/>
        </section>
      </div>)
  }
}
