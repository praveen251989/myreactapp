import React from 'react';

export const Table = (props) => {
  const {columns, data, className} = props;
  return (
    <div>
      <table className={className}>
        <thead>
          <tr>
            {columns.map((column, index) => 
              <th key={index} >{column.label}</th>
            )}
          </tr>
        </thead>
        <tbody>
        {data.map((row, index) => 
          <tr key={index}>
            {columns.map((column, cindex) => 
              <td key={cindex} >{row[`${column.key}`]}</td>
            )}
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}




  