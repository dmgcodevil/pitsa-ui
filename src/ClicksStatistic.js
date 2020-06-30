import React, { Component } from "react";
import { Button, Header, Statistic, Icon, Table } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';

class ClicksStatistic extends Component {

    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    state = {
        data: []
    }

    fetchData() {
        axios.get(this.addr + '/statistic/clicks/AS32934')
            .then(response => {
                this.updateState(response)
            })
            .catch(error => {
                console.log(error);
            })
    }

    updateState(response) {
        console.log(response)
        const newState = Object.assign({}, this.state, {
            data: [response.data.clicks]
        });
        this.setState(newState);
    }

    componentDidMount() {
        this.fetchData()
    }


    reset() {
        axios.post(this.addr + '/statistic/clicks/AS32934/reset')
            .then(response => {
                this.fetchData()
            })
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="ClicksStatistic">
                <Header as='h2'>
                    <Icon name='area graph' />
                    <Header.Content>Statistic</Header.Content>
                </Header>
                {
                    this.state.data.map((clicks, index) => {
                        return <Table textAlign='left'>
                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>
                                        <Statistic.Group>
                                            <Statistic>
                                                <Statistic.Value>{clicks.total}</Statistic.Value>
                                                <Statistic.Label>Total</Statistic.Label>
                                            </Statistic>
                                            <Statistic>
                                                <Statistic.Value>{clicks.bots}</Statistic.Value>
                                                <Statistic.Label>Bots</Statistic.Label>
                                            </Statistic>
                                            <Statistic>
                                                <Statistic.Value>{clicks.users}</Statistic.Value>
                                                <Statistic.Label>Users</Statistic.Label>
                                            </Statistic>

                                        </Statistic.Group>
                                    </Table.Cell>
                                    <Table.Cell> 
                                        <Button icon>
                                            <Icon name='refresh' onClick={() => this.fetchData()} />
                                        </Button>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Button color='red' animated='vertical' onClick={() => this.reset()}>
                                            <Button.Content hidden>Reset</Button.Content>
                                            <Button.Content visible>
                                                <Icon name='recycle' />
                                            </Button.Content>
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>

                    })
                }





            </div>
        )
    }
}

export default ClicksStatistic;