import React from 'react';
import firebase from '../../firebase';

import { Grid, Form, Segment, Button, Header, Message, Icon } from
'semantic-ui-react';

import { Link } from 'react-router-dom';

class Registro extends React.Component {
  state = {
    nomeusu: '',
    email: '',
    senha: '',
    confirmaSenha: '',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(createdUser => {
        console.log(createdUser);
      })
      .catch(err => {
        console.error(err);
      });
    
  }


  render() {
    const { nomeusu, email, senha, confirmaSenha } = this.state;
    
    return (
      <Grid textAlign="center" verticalAlign="middle" className="App">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
              Registro para DevChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid name="nomeusu" icon="user" iconPosition="left"
              placeholder="Nome Usuario" onChange={this.handleChange} value={nomeusu} type="text" />

              <Form.Input fluid name="email" icon="mail" iconPosition="left"
              placeholder="Email Adress" onChange={this.handleChange} value={email} type="email" />

              <Form.Input fluid name="senha" icon="lock" iconPosition="left"
              placeholder="Senha" onChange={this.handleChange} value={senha} type="password" />

              <Form.Input fluid name="confirmaSenha" icon="repeat" iconPosition="left"
              placeholder="Confirma Senha" onChange={this.handleChange} value={confirmaSenha} type="password" />

              <Button color="orange" fluid size="large">Enviar</Button>

            </Segment>
          </Form>
          <Message>Já é um usuario? <Link to="/login">Login</Link></Message>

        </Grid.Column>
      </Grid>
    );
  }
}

export default Registro;