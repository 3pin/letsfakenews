import React from 'react';
import {
  connect
} from 'react-redux'
import FrameBanner from '../../app/components/frameBanner';
import FrameButton from '../../app/components/frameButton';

connect((store) => {
  return {
    store: store
  }
})

class Landing extends React.Component {
  apiGet = async (apiEndPoint) => {
    const response = await fetch(apiEndPoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    console.log('store: ' + this.props.store)
  }
  render() {
    return (<div>
      <section>
        <FrameBanner title="About..." desc="Welcome to the LetsFakeNews service, broadcasting live from the El-Jazeera news-room."/>
        <hr/>
        <FrameButton linkto="/write" buttonLabel="Create" desc="Create fakenews"/>
        <hr/>
        <FrameButton variant="outline-secondary" linkto="/watch" buttonLabel="Watch" desc="Display fakenews (desktop only)"/>
        <hr/>
        <FrameButton variant="outline-secondary" linkto="/admin" buttonLabel="Admin" desc="Moderate fakenews (admin only)"/>
        <hr/>
      </section>
    </div>)
  }
}
export default Landing
