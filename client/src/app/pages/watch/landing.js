import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

const LandingWatch = () => {
  return (<div>
      <section>
        <FrameBanner title="Watch..." desc="Use these buttons to display stories as fake-news or visualise them as word-tracks... both will display in fullscreen."/>
        <hr/>
        <FrameButton buttonLabel="Watch" linkto="/watch/display"/>
        <hr/>
        <FrameButton variant="secondary" buttonLabel="Visualise" linkto="/watch/visualise"/>
        <hr/>
      </section>
    </div>)
}
export default LandingWatch
