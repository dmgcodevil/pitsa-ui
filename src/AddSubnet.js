

import React, { Component } from "react";
import { Table, Input, Dropdown } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';


const versionOptions = [
    { key: 'ipv4', text: 'ipv4', value: 'ipv4' },
    { key: 'ipv6', text: 'ipv6', value: 'ipv6' },
]


class AddSubnet extends Component {

    state = {
        ip: '',
        version: '',
    }

    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    setIp(ip) {
        this.setState({ ip: ip });
    }

    setVersion(version) {
        this.setState({ version: version });
    }

    add() {
        let version = this.state.version
        let ip = this.state.ip
        if (version === "") {
            version = 'ipv4'
        }
        axios.post(this.addr + '/subnets/AS32934/add?ip=' + ip + '&version=' + version)
            .then(response => {
                this.props.onAdd({ ip: ip, version: version, enabled: true })
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {
        return (
            <div className="AddSubnet">
                <Table textAlign='left' >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Add Subnet</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell collapsing>
                                <Input
                                    label={<Dropdown defaultValue='ipv4' options={versionOptions}
                                        onChange={(event, data) => this.setVersion(data.value)} />}
                                    labelPosition='left'
                                    placeholder='0.0.0.0/0'
                                    onChange={(event, data) => {
                                        this.setIp(data.value)
                                    }}
                                    action={{
                                        onClick: () => this.add(),
                                        icon: 'add',
                                        color: 'green'
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

export default AddSubnet;