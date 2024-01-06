import React from 'react';
import { Table } from '@mui/material';

export const MyTable = (props) => {
  const {columns, data} = props;
  return (
    <div>
      <Table borderAxis="both" hoverRow>
        <thead>
          <tr>
            {columns.map((column, index) => 
              <th key={index}>{column.label}</th>
            )}
          </tr>
        </thead>
        <tbody>
        {data.length > 0 ? (data.map((row, index) => 
          <tr key={index}>
            {columns.map((column, cindex) => 
              <td key={cindex} >{row[`${column.key}`]}</td>
            )}
          </tr>
        )) : 
        (<tr><td>No Data Available</td></tr>)
        }
        </tbody>
      </Table>
    </div>
  )
}




  