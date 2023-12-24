import React from 'react'
import { Table } from './Table'

const CustomTable = (props) => {
    const {elements, columns, data} = props;
    console.log(elements);
    let tableData = [];
    if (data) tableData = data;
  return (
    <div>
        <div className='wfrow'>
            {elements.map((el, index) => (
                <div key={index}>
                    <div className='leftAlign'><label>{el.label}:</label></div>
                    <div><input type={"text"} name={el.name} required={el.required}/></div>
                </div>
            ))} 
            <div>
                <span className='gp-1 '>
                    <button className='btn btn-primary'>Update</button>
                    <button className='btn btn-primary'>Add New</button>
                </span>
            </div>
        </div>
        <br/>
        <Table className="mytable" columns={columns} data={tableData}/>
    </div>
  )
}

export default CustomTable