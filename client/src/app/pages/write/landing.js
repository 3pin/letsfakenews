import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Write..." desc="Pretend you're a journalist with a deadline but no news to report. Why not trick the news-room into broadcasting a fake story? To ensure they accept your story use correct spelling, capitalisation etc."/>
        <hr/>
        <ButtonFrame linkto="/write/story" buttonlabel="Start"/>
        <hr/>
      </section>
    </div>)
  }
}
