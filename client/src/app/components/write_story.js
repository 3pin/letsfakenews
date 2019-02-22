import React from 'react';
import {Link} from 'react-router-dom';

export default class Story extends React.Component {
  handleChange(e) {
    const story = e.target.value;
    this.props.changeStory(story);
  }
  render() {
    return (<div>
      <section className="section" id="2">
        <h2>Write a story...</h2>
        <form id="story_form" className="form-horizontal">
          <div className="form-group">
            <textarea value={this.props.story} onChange={this.handleChange.bind(this)} id="story" autoFocus className="form-control form-responsive" rows="4" maxLength="280" required="required" placeholder="280 chars max..."></textarea>
            <div className="col-xs-10 col-sm-8 col-md-8 col-lg-8">
              <br/>
              <Link to="/write/title">
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
