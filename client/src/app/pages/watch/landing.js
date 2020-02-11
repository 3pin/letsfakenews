import React from 'react';

import FrameBanner from '../../../app/components/frameBanner';
import FrameButton from '../../../app/components/frameButton';

const LandingWatch = () => {
  return (<div>
      <section>
        <FrameBanner title="Watch..." desc="Use these buttons to display stories as fake-news or visualise them as word-tracks... both will display in fullscreen."/>
        <hr/>
        <FrameButton buttonLabel="News" linkto="/watch/news" desc="Watch fake-news broadcast live by 'El-Jazeera'"/>
        <hr/>
        <FrameButton variant="secondary" buttonLabel="Scroller" linkto="/watch/text" desc="Visualise news-stories as scrolling-text"/>
        <hr/>
        <FrameButton variant="secondary" buttonLabel="Slideshow" linkto="/watch/images" desc="Visualise news-headlines as an image-slideshow"/>
        <hr/>
      </section>
    </div>)
}
export default LandingWatch
