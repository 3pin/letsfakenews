import React from 'react';

import BannerFrame from '../../app/components/bannerframe';
import ButtonFrame from '../../app/components/buttonframe';

export default class Landing extends React.Component {
  componentDidMount() {
    //console.log(this.state);
}
  render() {
    return (<div>
      <section>
        <BannerFrame title="About..." desc="Welcome to the LetsFakeNews 24-hour TV service where we take your fake-news without judgement and display it for the world to see."/>
        <hr/>
        <ButtonFrame linkto="/write" buttonlabel="Write" desc="Write fakenews on your device (Phone, Desktop etc.)"/>
        <hr/>
        <ButtonFrame linkto="/watch" buttonlabel="Watch" desc="Watch fakenews in fullscreen (Desktop only)"/>
        <hr/>
        <ButtonFrame linkto="/admin" buttonlabel="Admin" desc="Administer the fakenews (Password required)"/>
        <hr/>
      </section>
    </div>)
  }
}
