import React from 'react';
//
import FrameBanner from '../../app/components/frameBanner';
import FrameButton from '../../app/components/frameButton';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner
          title="LetsFakeNews..."
          desc="Welcome to LetsFakeNews, broadcasting live from the El-Jazeera news room. Write a fake-story on your Phone, then watch news reported in fullscreen (via Computer/SmartTV)."/>
        <hr/>
        <FrameButton
          linkto="/write"
          buttonLabel="Write"
          desc="Write fakenews"/>
        <hr/>
        <FrameButton
          variant='secondary'
          linkto="/watch"
          buttonLabel="Watch"
          desc="Watch fakenews (Computer only)"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
