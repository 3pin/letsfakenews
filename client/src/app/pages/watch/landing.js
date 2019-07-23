import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class LandingWatch extends React.Component {

  render() {
    return (<div>
      <section>
        <BannerFrame title="Watch..." desc="Go ahead and display the fake-news broadcast. Note: it is best displayed on a large flat-screen or projection-surface."/>
        <hr/>
        <ButtonFrame buttonLabel="Watch" linkto="/watch/display"/>
        <hr/>
      </section>
    </div>)
  }
}
