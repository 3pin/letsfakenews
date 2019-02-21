import React from 'react';
import {
  Link
} from 'react-router-dom';

export default class Feedback extends React.Component {
  render() {
    return (<div>
      <section className="section" id="5">
        <h2>Leave your feedback...</h2>
        <form id="feedback_form" className="form-horizontal">
          <div className="form-group">
            <textarea id="feedback" className="form-control form-responsive" rows="4" maxLength="280" required="required" placeholder="280 chars max..."></textarea>
            <div className="col-xs-10 col-sm-8 col-md-8 col-lg-8">
              <br/>
              <Link to="/">
              <button type="submit" className="btn btn-primary btn-responsive">Submit</button>
              </Link>
            </div>
          </div>
        </form>
      </section>
      <hr/>
    </div>)
  }
}
