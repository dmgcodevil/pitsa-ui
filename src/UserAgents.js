import React, { Component } from "react";
import { Button, Table, Icon, Checkbox, Header } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';
import AddUserAgent from './AddUserAgent'
import "./scrolltable.css";

import * as  scrollable from './ScrollableTable'


class UserAgents extends Component {
    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    state = {
        values: []
    }

    fetchUserAgents = () => {

        axios.get(this.addr + '/policy/AS32934/useragent')
            .then(response => {
                console.log(response)
                this.updateState(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateState(response) {
        const newState = Object.assign({}, this.state, {
            values: response.data.values
        });
        this.setState(newState);
    }

    refreshState() {
        this.setState(this.state);
    }

    componentDidMount() {
        this.fetchUserAgents()
    }

    add(userAgent) {
        this.state.values.unshift(userAgent)
        this.refreshState()
    }

    delete(userAgent) {
        axios.post(this.addr + '/policy/AS32934/useragent/delete?agent=' + userAgent)
            .then(response => {
                var index = this.state.values.indexOf(userAgent);
                this.state.values.splice(index, 1);
                this.refreshState()

            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="sidescroll">
                <Header as='h2'>
                    <Icon name='user secret' />
                    <Header.Content>User Agents</Header.Content>
                </Header>
                <Table striped selectable>
                    <Table.Header>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>
                                <AddUserAgent onAdd={(res) => this.add(res)} />
                            </Table.HeaderCell>
                        </scrollable.ScrollableTableRow>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>User Agent</Table.HeaderCell>
                            <Table.HeaderCell />
                        </scrollable.ScrollableTableRow>
                    </Table.Header>
                    <scrollable.ScrollableTableBody>

                        {
                            this.state.values.map((element, index) => {
                                return <scrollable.ScrollableTableRow key={index}>
                                    <Table.Cell>
                                        {element}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon onClick={() => this.delete(element)}>
                                            <Icon name='trash alternate outline' color='red' />
                                        </Button>
                                    </Table.Cell>
                                </scrollable.ScrollableTableRow>

                            })
                        }

                    </scrollable.ScrollableTableBody>

                    <Table.Footer fullWidth>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    size='small'
                                    onClick={this.fetchUserAgents}>
                                    <Icon name='refresh' />
                                    Refresh
                                    </Button>
                            </Table.HeaderCell>
                        </scrollable.ScrollableTableRow>
                    </Table.Footer>

                </Table>
            </div>
        );
    }
}

export default UserAgents;