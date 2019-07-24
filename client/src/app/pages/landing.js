import React from 'react';
import {connect} from 'react-redux'
import BannerFrame from '../../app/components/bannerframe';
import ButtonFrame from '../../app/components/buttonframe';

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
        <BannerFrame title="About..." desc="Welcome to the LetsFakeNews service, broadcasting live from the El-Jazeera news-room."/>
        <hr/>
        <ButtonFrame linkto="/write" buttonLabel="Create" desc="Create fakenews"/>
        <hr/>
        <ButtonFrame variant="outline-secondary" linkto="/watch" buttonLabel="Watch" desc="Display fakenews (desktop only)"/>
        <hr/>
        <ButtonFrame variant="outline-secondary" linkto="/admin" buttonLabel="Admin" desc="Moderate fakenews (admin only)"/>
        <hr/>
      </section>
    </div>)
  }
}
export default Landing
