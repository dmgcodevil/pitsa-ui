import React, { Component } from "react";
import { Button, Table, Icon, Header } from "semantic-ui-react";
import axios from 'axios';
import config from 'react-global-configuration';

class Uploader extends Component {
    host = config.get('server.host')
    port = config.get('server.port')
    addr = 'http://' + this.host + ':' + this.port

    whiteFileInputRef = React.createRef();
    grayFileInputRef = React.createRef();

    state = {
        whiteFiles: [],
        grayFiles: []
    }

    upload(offerType) {
        console.log('upload ' + offerType + '  offer')

        let files

        if (offerType === 'white') {
            files = this.state.whiteFiles
        } else {
            files = this.state.grayFiles
        }

        const data = new FormData()
        for (var i = 0; i < files.length; i++) {
            data.append('files', files[i])
        }


        axios.post(this.addr + "/site/upload/" + offerType, data, {
            // receive two    parameter endpoint url ,form data
        }) // todo .then .catch

    }


    fileChange(event, offertType) {
        if (offertType === 'white') {
            this.setState(Object.assign({}, this.state, {
                whiteFiles: event.target.files
            }));
        } else {
            this.setState(Object.assign({}, this.state, {
                grayFiles: event.target.files
            }));
        }

    }


    render() {
        return (
            <div className="uploader">
                <Header as='h2'>
                    <Icon name='file text outline' />
                    <Header.Content>Content</Header.Content>
                </Header>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="2">Upload Site</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row  >
                            <Table.Cell collapsing width={2}>
                                <Button
                                    content="White"
                                    labelPosition="left"
                                    icon="file"
                                    onClick={() => this.whiteFileInputRef.current.click()}
                                ></Button>
                                <input
                                    ref={this.whiteFileInputRef}
                                    type="file"
                                    hidden
                                    directory="" webkitdirectory=""
                                    onChange={(event) => this.fileChange(event, 'white')}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Button color='blue' animated='vertical' onClick={() => this.upload('white')}>
                                    <Button.Content hidden>Upload</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='upload' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>

                        <Table.Row  >
                            <Table.Cell collapsing width={2}>
                                <Button
                                    content="Gray"
                                    labelPosition="left"
                                    icon="file"
                                    onClick={() => this.grayFileInputRef.current.click()}
                                ></Button>
                                <input
                                    ref={this.grayFileInputRef}
                                    type="file"
                                    hidden
                                    directory="" webkitdirectory=""
                                    onChange={(event) => this.fileChange(event, 'gray')}
                                />
                            </Table.Cell>
                            <Table.Cell>
                                <Button color='blue' animated='vertical' onClick={() => this.upload('gray')}>
                                    <Button.Content hidden>Upload</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='upload' />
                                    </Button.Content>
                                </Button>
                            </Table.Cell>
                        </Table.Row>

                    </Table.Body>
                </Table>
            </div>
        )
    }
}

export default Uploader;

