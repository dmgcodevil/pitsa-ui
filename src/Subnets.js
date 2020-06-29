import React, { Component } from "react";
import { Button, Table, Icon } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';
import "./scrolltable.css";



class Subnets extends Component {

     host = config.get('server.host')
     port = config.get('server.port')
     addr = 'http://' + this.host + ':'+ this.port

    state = {
        values: []
    };

    fetchSubnets = () => {

        axios.get(this.addr+'/subnets/AS32934')
        .then(response => {
            this.updateState(response)
        })
        .catch(error => {
          console.log(error);
        })
    }

    reloadSubnets = () => {
        axios.post(this.addr+'/subnets/reload/AS32934')
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

    render() {
        return (
            <div className="sidescroll">
                <Table striped selectable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">Subnets ASN: AS32934</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell >Subnet</Table.HeaderCell>
                            <Table.HeaderCell>Version</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.state.values.map(element => {
                                return <Table.Row>
                                    <Table.Cell>
                                        {element.ip}
                                    </Table.Cell>
                                    <Table.Cell>
                                        ipv4
                                    </Table.Cell>
                                </Table.Row>

                            })
                        }

                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'>
                                <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    size='small'
                                    onClick={this.fetchSubnets}>
                                    <Icon name='refresh'/> 
                                    Refresh
                                    </Button>
                                    <Button
                                    floated='right'
                                    icon
                                    labelPosition='left'
                                    size='small'
                                    onClick={this.reloadSubnets}>
                                    <Icon name='refresh'/> 
                                    Reload
                                    </Button>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>

                </Table>



            </div>
        );
    }
}

export default Subnets;