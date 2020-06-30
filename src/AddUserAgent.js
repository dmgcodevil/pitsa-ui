import React, { Component } from "react";
import { Table, Input } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';

class AddUserAgent extends Component {
    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    state = {
        agent: ''
    }

    setAgent(agent) {
        this.setState({ agent: agent });
    }

    add() {
        console.log('user agent = ' + this.state.agent)
        axios.post(this.addr + '/policy/AS32934/useragent?agent=' + this.state.agent)
            .then(response => {
                console.log(response)
                if (response.data.ok === true || response.data.ok === 'true') {
                    this.props.onAdd(this.state.agent)
                }

            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="AddUserAgent">
                <Table textAlign='left' >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Add User Agent</Table.HeaderCell>
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
                                    defaultValue='facebook'
                                    onChange={(event, data) => {
                                        this.setAgent(data.value)
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

export default AddUserAgent;