import React from 'react';
//
import FrameBanner from '../../app/components/frameBanner';
import Desc from '../../app/components/desc';
import FrameButton from '../../app/components/frameButton';

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner
          title="LetsFakeNews..."
          desc="Welcome to LetsFakeNews, broadcasting live from the El-Jazeera news room"/>
        <Desc
          desc="Write a fake story on your phone then watch it reported on a computer/TV"/>
        <hr/>
        <FrameButton
          linkto="/write"
          buttonLabel="Write"
          desc="Write fakenews (phone etc.)"/>
        <hr/>
        <FrameButton
          linkto="/watch"
          buttonLabel="Watch"
          desc="Watch fakenews (desktop only)"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
