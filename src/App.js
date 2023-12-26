import './App.css';
import React from 'react';
import { Table } from './Table';

function getData() {
  return [
    {"firstName":"Praveen", "lastName":"Penumatsa", "address":"Hyderabad", "age":34},
    {"firstName":"Kumar", "lastName":"Penumatsa", "address":"Kakinada", "age":32},
    {"firstName":"Prasanna", "lastName":"Indukuri", "address":"Hyderabad", "age":30},
    {"firstName":"Varma", "lastName":"RudraRaju", "address":"Hyderabad", "age":25},
    {"firstName":"Raghu", "lastName":"Kalidindi", "address":"Hyderabad", "age":20}
  ]
}
function getColumns() {
  return [
    {
      "key":"firstName",
      "label":"First Name"
    },
    {
      "key":"lastName",
      "label":"Last Name"
    },
    {
      "key":"address",
      "label":"Address"
    },
    {
      "key":"age",
      "label":"Age"
    },
  ]
}

function App() {
  const elementsData = [
    {"name":"equipMake","label":"Equipment Make", "required":true},
    {"name":"equipModel","label":"Equipment Model", "required":true},
    {"name":"serialNumber","label":"Serial Number", "required":false},
    {"name":"startingMeter","label":"Starting Meter", "required":false},
  ]
  return (
    <div>
      <br/>
      <center>
        <Table className="mytable" columns={getColumns()} data={getData()}/>
      </center>
      
    </div>
  );
}

export default App;
