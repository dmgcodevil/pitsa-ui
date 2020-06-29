import React, { Component } from "react";
import { Button, Table, Icon, Checkbox, Header } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';
import AddSubnet from './AddSubnet'
import "./scrolltable.css";

import * as  scrollable from './ScrollableTable'


class Subnets extends Component {

    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port



    state = {
        values: []
    };


    fetchSubnets = () => {

        axios.get(this.addr + '/subnets/AS32934')
            .then(response => {
                this.updateState(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    reloadSubnets = () => {
        axios.post(this.addr + '/subnets/reload/AS32934')
            .then(response => {
                this.updateState(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.fetchSubnets()
    }

    updateState(response) {
        const newState = Object.assign({}, this.state, {
            values: response.data.subnets
        });

        // store the new state object in the component's state
        this.setState(newState);
    }


    refreshState() {
        this.setState(this.state);
    }

    activate(subnent, checked) {
        subnent.enabled = checked
        axios.post(this.addr + '/subnets/AS32934/setStatus?ip=' + subnent.ip + '&active=' + checked)
            .catch(error => {
                console.log(error);
            })

        this.refreshState()
    }

    delete(subnent) {
        axios.post(this.addr + '/subnets/AS32934/delete?ip=' + subnent.ip)
            .then(response => {
                var index = this.state.values.indexOf(subnent);
                this.state.values.splice(index, 1);
                this.refreshState()

            })
            .catch(error => {
                console.log(error);
            })
    }

    addSubnet(subnet)  {
        this.state.values.unshift(subnet)
        this.refreshState()
    }

    render() {
        return (
            <div className="sidescroll">
                <Header as='h2'>
                    <Icon name='sitemap' />
                    <Header.Content>Subnets</Header.Content>
                </Header>
                <Table striped selectable>
                    <Table.Header>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>
                                <AddSubnet onAdd={(res) => this.addSubnet(res)}></AddSubnet>
                            </Table.HeaderCell>
                        </scrollable.ScrollableTableRow>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell>Subnet</Table.HeaderCell>
                            <Table.HeaderCell>Version</Table.HeaderCell>
                            <Table.HeaderCell />
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
                                        {element.version}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Checkbox
                                            checked={element.enabled}
                                            onChange={(e, { checked }) => this.activate(element, checked)}
                                        />
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button icon onClick={() => this.delete(element)}>
                                            <Icon name='delete' />
                                        </Button>
                                    </Table.Cell>
                                </scrollable.ScrollableTableRow>

                            })
                        }

                    </scrollable.ScrollableTableBody>

                    <Table.Footer fullWidth>
                        <scrollable.ScrollableTableRow>
                            <Table.HeaderCell colSpan='2'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    size='small'
                                    onClick={this.fetchSubnets}>
                                    <Icon name='refresh' />
                                    Refresh
                                    </Button>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    size='small'
                                    onClick={this.reloadSubnets}>
                                    <Icon name='refresh' />
                                    Reload
                                    </Button>
                            </Table.HeaderCell>
                        </scrollable.ScrollableTableRow>
                    </Table.Footer>

                </Table>
            </div>
        );
    }
}

export default Subnets;