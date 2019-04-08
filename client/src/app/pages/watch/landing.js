import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class LandingWatch extends React.Component {

  render() {
    return (<div>
      <section>
        <BannerFrame title="Watch..." desc="Open this link on a desktop browser, set to fullscreen and enjoy the show!"/>
        <hr/>
        <ButtonFrame linkto="/watch/display" buttonlabel="Watch"/>
        <hr/>
      </section>
    </div>)
  }
}
