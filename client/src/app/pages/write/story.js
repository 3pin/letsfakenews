import React from 'react';
import { connect } from 'react-redux';

import FrameBanner from '../../components/frameBanner';
import FrameForm from '../../components/frameForm';
import { creatingNews } from '../../actions/creatingNews'

class WriteStory extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (value) => {
    this.setState({
      [this.props.subject]: value
    });
  }
  render() {
    return (<div>
        <section>
          <FrameBanner
            title="Write a story..."
            desc="Make up a fake-news story"/>
          <hr/>
          <FrameForm
            subject='story'
            currentPathname="/write/story"
            buttonLabel="Next"
            rows="4"
            minLength="80"
            maxLength="280"
            linkto="/write/title"
            handleChange={this.handleChange}/>
          <hr/>
        </section>
      </div>)
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(WriteStory);
