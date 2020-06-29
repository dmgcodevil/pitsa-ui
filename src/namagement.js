import React from "react";
import { Grid, Segment, Button, Label, Table, Icon, List } from "semantic-ui-react";

const UploadContent = () => (
  <Table striped>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell colSpan="1">Upload Site</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Button icon labelPosition="right">
            White
            <Icon name="upload" />
          </Button>
          <Button icon labelPosition="right">
            Gray
            <Icon name="upload" />
          </Button>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
);

const Management = () => (
  <Grid columns={1} divided>
    <Grid.Row stretched>
      <Grid.Column>
        <UploadContent />
      </Grid.Column>
    </Grid.Row>
    <Grid.Row stretched>
      <Grid.Column>
 

      <List>
        
          <List.Item>Pears</List.Item>
          <List.Item>Oranges</List.Item>
       </List>
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default Management;
