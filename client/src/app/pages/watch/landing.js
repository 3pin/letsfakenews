import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

const LandingWatch = () => {
  return (<div>
      <section>
        <FrameBanner title="Watch..." desc="Use the button below to display the fake-news broadcast. It should be displayed in fullscreen on a large surface via laptop / computer / smartTV."/>
        <hr/>
        <FrameButton buttonLabel="Watch" linkto="/watch/display"/>
        <hr/>
        <FrameButton variant="secondary" buttonLabel="Visualise" linkto="/watch/visualise"/>
        <hr/>
      </section>
    </div>)
}
export default LandingWatch
