import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

export default class LandingWatch extends React.Component {

  render() {
    return (<div>
      <section>
        <FrameBanner title="Watch..." desc="Go ahead and display the fake-news broadcast. Note: it is best displayed on a large flat-screen or projection-surface."/>
        <hr/>
        <FrameButton buttonLabel="Watch" linkto="/watch/display"/>
        <hr/>
      </section>
    </div>)
  }
}
