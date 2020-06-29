import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Subnets from './Subnets.js'
import { List } from "semantic-ui-react";

import config from 'react-global-configuration';
import configuration from './config';

config.set(configuration);

class App extends Component {

 entries =  ["1","2","3"]

 displayList  = () => {
  this.entries.map(element => {
  return <List.Item>{element}</List.Item>
  });
 }


  componentDidMount() {}

  render() {
    return (
      <div className="App">
       <Subnets/>
       </div>
    );
  }
}

export default App;