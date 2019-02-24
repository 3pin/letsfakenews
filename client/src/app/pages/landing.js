import React from 'react';

import BannerFrame from '../../app/components/banner';
import ButtonFrame from '../../app/components/button';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="About..." desc="Pretend you're a journalist with a deadline but no news to report so you're going to fake it! Try to trick the Al-Jazeera news-room into broadcasting your fake story, then wait to see if it appears on the public screen. To ensure the news-room accept your story, be grammatically correct with spelling, capitalisation etc."/>
        <ButtonFrame linkto="/write" label="write" desc="Write your own fake news story"/>
        <ButtonFrame linkto="/watch" label="watch" desc="Watch fakenews on a computer'a (not phone) browser in fullscreen"/>
        <ButtonFrame linkto="/admin" label="admin" desc="Login to admin backend"/>
      </section>
    </div>)
  }
}
