import React from 'react';
import {Link} from 'react-router-dom';

export default class Thankyou extends React.Component {
  render() {
    return (<div>
      <section className="section" id="4">
        <h2>Thank you...</h2><br/>
        <p>Want to try again?</p>
        <Link to="/write">
          <button id="Goto_Start" name="thankyou" type="submit" className="btn btn-primary btn-responsive">Restart</button>
        </Link>
        <br/><br/>
        <p>Leave us your feedback</p>
        <Link to="/write/feedback">
          <button id="Goto_Feedback" name="feedback" type="submit" className="btn btn-primary btn-responsive">Feedback</button>
        </Link>
      </section>
      <hr/>
    </div>)
  }
}
