import React from 'react';
import firebase  from  '../../firebase';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends React.Component {
  state = {
    channels: [],
    channelName: '',
    channelDetails: '',
    channelRefs: firebase.database().ref('channels'),
    modal: false
  };
  
  addChannel = () => {

  }

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.add1channel();
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  isFormValid = ({ channelName, channelDetails }) =>
    channelName && channelDetails;

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  render() {
    const { channels, modal } = this.state;

    return (
      <React.Fragment>
      <Menu.Menu style={{ paddingBotton: '2em' }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> Channels
          </span>{" "}
          ({ channels.length }) <Icon name="add" onClick={this.openModal} />
        </Menu.Item>
        {/* Channels */ }

      </Menu.Menu>

          
      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form>

            <Form.Field>
              <Input 
                fluid
                label="Name of Channel"
                name="channelName"
                onChange={this.handleChange}
              />
            </Form.Field>

            <Form.Field>
              <Input 
                fluid
                label="About the Channel"
                name="channelDetails"
                onChange={this.handleChange}
              />
            </Form.Field>

          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={this.closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      </React.Fragment>
    )
  }
}

export default Channels;