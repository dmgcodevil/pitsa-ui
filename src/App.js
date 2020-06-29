import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Subnets from './Subnets.js'
import Uploader from './Uploader'
import { List, Table , Icon} from "semantic-ui-react";

import config from 'react-global-configuration';
import configuration from './config';

config.set(configuration);

class App extends Component {

  componentDidMount() {}

  render() {
    return (
      <div className="App">
         <Uploader/> 
         <Subnets/> 
       </div>
    );
  }
}

export default App;