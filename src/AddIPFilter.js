import React, { Component } from "react";
import { Table, Input } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';

class AddIPFilter extends Component {
    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    state = {
        ip: ''
    }

    setIp(ip) {
        this.setState({ ip: ip });
    }

    add() {
        console.log('add ip filter')
        axios.post(this.addr + '/policy/AS32934/ip/add?ip=' + this.state.ip)
            .then(response => {
                console.log(response)
                if (response.data.ok === true || response.data.ok === 'true') {
                    console.log('addddd')
                    this.props.onAdd({ ip: this.state.ip, allowed: true })
                }

            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="AddIPFilter">
                <Table textAlign='left' >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Add IP Filter</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell collapsing>
                                <Input
                                    action={{
                                        onClick: () => this.add(),
                                        icon: 'add',
                                        color: 'green'
                                    }}
                                    defaultValue='0.0.0.0'
                                    onChange={(event, data) => {
                                        this.setIp(data.value)
                                    }}
                                />
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>

                </Table>
            </div>
        )
    }

}

export default AddIPFilter;