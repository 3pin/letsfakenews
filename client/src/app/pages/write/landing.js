import React from 'react';

import BannerFrame from '../../../app/components/bannerframe';
import ButtonFrame from '../../../app/components/buttonframe';

export default class Landing extends React.Component {
  render() {
    return (<div>
      <section>
        <BannerFrame title="Create..." desc="You're a journalist with a deadline but no news to report... Try to trick the news-room into broadcasting your fake news story... To ensure its accepted, use correct spelling & grammar."/>
        <hr/>
        <ButtonFrame variant="secondary" linkto="/write/story" buttonLabel="Start"/>
        <hr/>
      </section>
    </div>)
  }
}
