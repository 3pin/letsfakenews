import React from 'react';
import {Link} from 'react-router-dom';

export default class Title extends React.Component {
  handleChange(e) {
    //console.log(event.target.value);
    const title = e.target.value;
    this.props.changeTitle(title);
  }
  handleSubmit(e) {
    //e.preventDefault();
    this.props.handleSubmit();
  };
  render() {
    return (<div>
      <section className="section" id="3">
        <h2>Add a headline...</h2>
        <form onSubmit={this.handleSubmit} id="title_form" className="form-horizontal">
          <div className="form-group">
            <textarea value={this.props.title} onChange={this.handleChange.bind(this)} id="title" autoFocus className="form-control form-responsive" rows="1" maxLength="25" required="required" placeholder="25 chars max..."></textarea>
            <div className="col-xs-10 col-sm-8 col-md-8 col-lg-8">
              <br/>
              <Link to="/write/thankyou" >
                <button type="submit" onClick={this.handleSubmit.bind(this)} className="btn btn-primary btn-responsive">Submit</button>
              </Link>
            </div>
          </div>
        </form>
        <br/>
      </section>
      <hr/>
    </div>)
  }
}
