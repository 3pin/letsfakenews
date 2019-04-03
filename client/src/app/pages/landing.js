import React from 'react';

import BannerFrame from '../../app/components/banner';
import ButtonFrame from '../../app/components/button';

export default class Landing extends React.Component {
  componentDidMount() {
    //console.log(this.props);
}
  render() {
    return (<div>
      <section>
        <BannerFrame title="About..." desc="Welcome to the LetsFakeNews 24-hour TV service where we take your fake-news without judgement and display it for the world to see."/>
        <hr/>
        <ButtonFrame linkto="/write" buttonlabel="Write" desc="Write fakenews (using your Phone or Desktop)"/>
        <hr/>
        <ButtonFrame linkto="/watch" buttonlabel="Watch" desc="Watch fakenews in fullscreen (Desktop only)"/>
        <hr/>
        <ButtonFrame linkto="/admin" buttonlabel="Admin" desc="Administer the fakenews (password required)"/>
        <hr/>
        <ButtonFrame linkto="/login" buttonlabel="Login" desc="Login as an admin"/>
        <hr/>
      </section>
    </div>)
  }
}
