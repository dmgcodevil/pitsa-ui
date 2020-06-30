import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import Subnets from './Subnets.js'
import Uploader from './Uploader'
import IPFilters from './IPFilters'
import UserAgents from './UserAgents'
import ClicksStatistic from './ClicksStatistic'
import { List, Table, Icon, Grid } from "semantic-ui-react";

import config from 'react-global-configuration';
import configuration from './config';

config.set(configuration);

class App extends Component {

  componentDidMount() { }

  render() {
    return (
      <div className="App">
        <Grid celled>
          <Grid.Row>
            <Grid.Column width={4}>
              <Grid celled>
                <Grid.Row>
                  <Grid.Column>
                    <Uploader/>
                  </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
              
              <ClicksStatistic/>
                    </Grid.Column>
                  </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column width={12}>
              <Subnets />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <IPFilters/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <UserAgents/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default App;