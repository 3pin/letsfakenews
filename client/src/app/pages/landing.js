import React from 'react';

import BannerFrame from '../../app/components/bannerframe';
import ButtonFrame from '../../app/components/buttonframe';

export default class Landing extends React.Component {
  apiGet = async (apiEndPoint) => {
    const response = await fetch(apiEndPoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  componentDidMount() {
    //this.apiGet('/settings/mode').then((res) => {console.log(res);});
}
  render() {
    return (<div>
      <section>
        <BannerFrame title="About..." desc="Welcome to the LetsFakeNews 24-hour news service, coming to you live from the El-Jazeera news-room."/>
        <hr/>
        <ButtonFrame linkto="/write" buttonLabel="Write" desc={`Write fakenews (phone-tablet-desktop)`}/>
        <hr/>
        <ButtonFrame linkto="/watch" buttonLabel="Watch" desc="Watch in fullscreen (desktop only)"/>
        <hr/>
        <ButtonFrame linkto="/admin" buttonLabel="Admin" desc="Admin access (login required)"/>
        <hr/>
      </section>
    </div>)
  }
}
