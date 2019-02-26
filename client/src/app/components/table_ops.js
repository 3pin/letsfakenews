import React from 'react';

export default class TableOps extends React.Component {
  componentDidMount() {
    //console.log(this.props);
    //console.log(this.props.tHeaders.one.style)
  }
  render() {
    const TableHeaders = this.props.tHeaders;
    console.log(TableHeaders);

    //tHeadersObject_Test()
    const TableHeadersObject = TableHeaders.map((entry, i) => <th key={i} style={{
        width: '50%'
      }}>{entry}</th>)

    return (<div>
      <table className="table table-bordered" style={{
          backgroundColor: "white"
        }}>
        <thead className="thead-dark">
          <tr>
            {TableHeadersObject}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Set new stories to go live automatically</td>
            <td style={{
                textAlign: 'center'
              }}>
              <input title="autolive" type="checkbox" className="form-check-input show_tip autolive"></input>
            </td>
          </tr>
          <tr>
            <td>Refresh imagery for all stories</td>
            <td style={{
                textAlign: 'center'
              }}>
              <button title="refresh" type="button" className="btn btn-primary show_tip refresh "></button>
            </td>
          </tr>
          <tr>
            <td>Clear all stories from database</td>
            <td style={{
                textAlign: 'center'
              }}>
              <button title="clear" type="button" className="btn btn-danger show_tip clear "></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>)
  }
}
