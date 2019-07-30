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
          desc="Would you like to watch fake-news? Better still would you like to create it? Well now is your chance..."/>
        <Desc
          desc="LetsFakeNews is broadcasting live from the El-Jazeera news-room. To watch use a desktop computer. To create use any second-screen device."/>
        <hr/>
        <FrameButton
          linkto="/watch"
          buttonLabel="Display"
          desc="Display fakenews (desktop only)"/>
        <hr/>
        <FrameButton
          linkto="/write"
          buttonLabel="Create"
          desc="Create fakenews (any device)"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
