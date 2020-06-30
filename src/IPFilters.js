import React, { Component } from "react";
import { Button, Table, Icon, Checkbox, Header } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';
import AddIPFilter from './AddIPFilter'
import "./scrolltable.css";

import * as  scrollable from './ScrollableTable'


class IPFilters extends Component {
    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    state = {
        values: []
    }


    fetchPolicy = () => {

        axios.get(this.addr + '/policy/AS32934')
            .then(response => {
                this.updateState(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateState(response) {
        const newState = Object.assign({}, this.state, {
            values: response.data.ip_filters
        });
        this.setState(newState);
    }

    refreshState() {
        this.setState(this.state);
    }

    componentDidMount() {
        this.fetchPolicy()
    }
    addIPFilter(ipFilter) {
        this.state.values.unshift(ipFilter)
        this.refreshState()
    }

    delete(filter) {
        axios.post(this.addr + '/policy/AS32934/ip/delete?ip=' + filter.ip)
            .then(response => {
                var index = this.state.values.indexOf(filter);
                this.state.values.splice(index, 1);
                this.refreshState()

            })
            .catch(error => {
                console.log(error);
            })
    }

    allow(filter, checked) {
        axios.post(this.addr + '/policy/AS32934/ip/allow?ip=' + filter.ip+'&allowed='+checked)
        .then(response => {
            filter.allowed =  checked
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
                    <Icon name='shield alternate' />
                    <Header.Content>IP Filters</Header.Content>
                </Header>
                <Table striped selectable>
                    <Table.Header>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>
                                <AddIPFilter onAdd={(res) => this.addIPFilter(res)} />
                            </Table.HeaderCell>
                        </scrollable.ScrollableTableRow>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>IP</Table.HeaderCell>
                            <Table.HeaderCell>Allowed</Table.HeaderCell>
                            <Table.HeaderCell />
                        </scrollable.ScrollableTableRow>
                    </Table.Header>
                    <scrollable.ScrollableTableBody>

                        {
                            this.state.values.map((element, index) => {
                                return <scrollable.ScrollableTableRow key={index}>
                                    <Table.Cell>
                                        {element.ip}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox
                                            checked={element.allowed}
                                            onChange={(e, { checked }) => this.allow(element, checked)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon onClick={() => this.delete(element)}>
                                            <Icon name='trash alternate outline' />
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
                                    onClick={this.fetchPolicy}>
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

export default IPFilters;