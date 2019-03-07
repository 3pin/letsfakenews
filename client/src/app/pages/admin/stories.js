import React from 'react';

import BannerFrame from '../../../app/components/banner';
//import TableOps from '../../../app/components/table_ops';

export default class Stories extends React.Component {
  render() {
    return (<div>
      <BannerFrame desc={this.props.desc} title={this.props.title}/>
      <hr/>
      <table className="table table-bordered" style={{backgroundColor: "white"}}>
        <thead className="thead-dark">
          <tr>
          <th style={{width:"95%"}}>Command</th>
          <th style={{width:"5%"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Set new stories to go live automatically</td>
            <td style={{textAlign:"center"}}><input type="checkbox" className="form-check-input show_tip autolive"/>
            </td>
          </tr>
          <tr>
            <td>Refresh imagery for all stories</td>
            <td>
              <button type="button" className="btn btn-primary show_tip refresh ">
              </button>
            </td>
          </tr>
          <tr>
            <td>Clear all stories from database</td>
            <td>
              <button type="button" className="btn btn-danger show_tip clear ">
              </button>
            </td>
          </tr>
        </tbody>
      </table>

    </div>)
  }
}
