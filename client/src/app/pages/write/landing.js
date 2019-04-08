import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Write..." desc="Pretend you're a journalist with a deadline but no news to report so you're going to fake it! Try to trick the Al-Jazeera news-room into broadcasting your fake story, then wait to see if it appears on the public screen. To ensure the news-room accept your story, be grammatically correct with spelling, capitalisation etc."/>
        <hr/>
        <ButtonFrame linkto="/write/story" buttonlabel="Start"/>
        <hr/>
      </section>
    </div>)
  }
}
