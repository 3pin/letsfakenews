import React from 'react';

import BannerFrame from '../../../app/components/banner';
import ButtonFrame from '../../../app/components/button';

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
