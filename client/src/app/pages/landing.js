import React from 'react';

import BannerFrame from '../../app/components/banner';
import ButtonFrame from '../../app/components/button';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="About..." desc="Pretend you're a journalist with a deadline but no news to report so you're going to fake it! Try to trick the Al-Jazeera news-room into broadcasting your fake story, then wait to see if it appears on the public screen. To ensure the news-room accept your story, be grammatically correct with spelling, capitalisation etc."/>
        <hr/>
        <ButtonFrame linkto="/write" buttonlabel="Write" desc="Write your own fake news story (on phones, desktops etc)"/>
        <hr/>
        <ButtonFrame linkto="/watch" buttonlabel="Watch" desc="Watch fakenews in fullscreen (desktop browsers only)"/>
        <hr/>
        <ButtonFrame linkto="/admin" buttonlabel="Admin" desc="Login to administer the system"/>
        <hr/>
      </section>
    </div>)
  }
}
