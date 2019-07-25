import React from 'react';
import {
  connect
} from 'react-redux'
import FrameBanner from '../../app/components/frameBanner';
import FrameButton from '../../app/components/frameButton';

connect((store) => {
  return {
    store: store
  }
})

const Landing = () => {
  return (<div>
      <section>
        <FrameBanner title="About..." desc="Welcome to the LetsFakeNews service, broadcasting live from the El-Jazeera news-room."/>
        <hr/>
        <FrameButton linkto="/write" buttonLabel="Create" desc="Create fakenews"/>
        <hr/>
        <FrameButton linkto="/watch" buttonLabel="Watch" desc="Display fakenews (desktop only)"/>
        <hr/>
        <FrameButton linkto="/admin" buttonLabel="Admin" desc="Moderate fakenews (admin only)"/>
        <hr/>
      </section>
    </div>)
}
export default Landing
