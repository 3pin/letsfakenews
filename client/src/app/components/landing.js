import React from 'react';
import {Link} from 'react-router-dom';

export default class Landing extends React.Component {
  render() {
    console.log(this.props)
    
    return (<div>
      <section className="section" id="1">
        <h2>About...</h2>
        <p>Pretend you're a journalist with a deadline but no news to report so you're going to fake it! Try to trick the Al-Jazeera news-room into broadcasting your fake story, then wait to see if it appears on the public screen. To ensure the news-room accept your story, be grammatically correct with spelling, capitalisation etc.
        </p>
        <br/>
        <p>Write your own fake news story</p>
        <Link to="/write">
          <button id="gototitle" type="button" className="btn btn-primary btn-responsive">Create</button>
        </Link>
        <br/><br/>
        <p>Use a desktop browser in fullscreen to watch fake-news</p>
        <Link to="/watch">
          <button id="gototitle" type="button" className="btn btn-primary btn-responsive">Watch</button>
        </Link>
        <br/><br/>
        <p>Login to administer the system</p>
        <Link to="/admin">
          <button id="gototitle" type="button" className="btn btn-primary btn-responsive">Admin</button>
        </Link>
      </section>
      <hr/>
    </div>)
  }
}
