import React from 'react';

import BannerFrame from '../../../app/components/banner';
import ButtonFrame from '../../../app/components/button';

export default class Landing extends React.Component {
  componentDidMount() {
    //console.log(this.props);
}
  render() {
    return (<div>
      <section>
        <BannerFrame title="Admin..." desc="Use the following buttons to administer the databases"/>
        <hr/>
        <ButtonFrame linkto="/admin/stories" buttonlabel="Stories" desc="Administer the stories being submitted"/>
        <hr/>
        <ButtonFrame linkto="/admin/feedback" buttonlabel="Feedback" desc="Administer the feedback being submitted"/>
        <hr/>
      </section>
    </div>)
  }
}
