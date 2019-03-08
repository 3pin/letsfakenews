import React, {
  Component
} from 'react';
import {
  BootstrapTable,
  TableHeaderColumn
} from 'react-bootstrap-table';
//import '../css/Table.css';
import '../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css';

function onSelectRow(row, isSelected, e) {
  if (isSelected) {
    alert(`You just selected '${row['name']}'`)
  }
}
const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,
  unselectable: [0],
  selected: [0],
  onSelect: onSelectRow,
  bgColor: 'gold'
};

var data = [
  {
    id: 1,
    name: 'Gob',
    value: '2'
  },
  {
    id: 2,
    name: 'Buster',
    value: '5'
  },
  {
    id: 3,
    name: 'George Michael',
    value: '4'
  }
];

export default class Table1 extends Component {
  render() {
    return (
      <div>
        <BootstrapTable data={data} selectRow={selectRowProp} exportCSV csvFileName='data.csv' version='4' hover>
          <TableHeaderColumn isKey dataField='id'>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='name'>
            Name
          </TableHeaderColumn>
          <TableHeaderColumn dataField='value'>
            Value
          </TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
