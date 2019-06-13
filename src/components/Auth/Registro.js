import React from 'react';
import firebase from '../../firebase';
import md5 from 'md5';


import { Grid, Form, Segment, Button, Header, Message, Icon } from
'semantic-ui-react';

import { Link } from 'react-router-dom';

class Registro extends React.Component {
  state = {
    username: '',
    email: '',
    senha: '',
    confirmaSenha: '',
    errors: [],
    loading: false,
    usersRef: firebase.database().ref('users')
  };

  isFormValid = () => {
    let errors = [];
    let error;

    if (this.isFormVazio(this.state)) {
      error = { message: 'Preencha corretamente os campos' };
      this.setState({ errors: errors.concat(error) })
      return false;
    } else if (!this.isSenhaValid(this.state)) {
      error = { message: ' Senha Invalida '}
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true
    }
  }

  isSenhaValid = ({ senha, confirmaSenha }) => {
    if (senha.length < 6 || confirmaSenha.length < 6) {
      return false;
    } else if (senha !== confirmaSenha) {
      return false;
    } else {
      return true;
    }
  }

  isFormVazio = ({ username, email, senha, confirmaSenha }) => {
    return !username.length || !email.length || !senha.length || !confirmaSenha.length;
  }

  mostrarErros = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid()) {
      this.setState({ errors: [], loading: true });
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.senha)
      .then(createdUser => {
        console.log(createdUser);
        createdUser.user.updateProfile({
          displayName: this.state.username,
          photoURL: `http://gravatar.com/avatar${md5(createdUser.user.email)}?d=identicon`
        })
        .then(() => {
          this.saveUser(createdUser).then(() => {
            console.log('user saved');
          })
        })
        .catch(err => {
          console.error(err);
          this.setState({ errors: this.state.errors.concat(err), loading: false });
        })
      })
      .catch(err => {
        console.error(err);
        this.setState({ errors: this.state.errors.concat(err), loading: false });
      });
    }
  };
saveUser = createdUser => {
  return this.state.usersRef.child(createdUser.user.uid).set({
    name: createdUser.user.displayName,
    avatar: createdUser.user.photoURL
  });
}

 handleInputError = (errors, inputName) => {
   return errors.some(error =>
    error.message.toLowerCase().includes(inputName)
    )
    ? "error"
    : ""
 }

  render() {
    const { username, email, senha, confirmaSenha, errors, loading } = this.state;
    
    return (
      <Grid textAlign="center" verticalAlign="middle" className="App">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
              Registro para UnipChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
              <Form.Input fluid name="username" icon="user" iconPosition="left"
              placeholder="Nome Usuario" onChange={this.handleChange} value={username} type="text" 
              />

              <Form.Input fluid name="email" icon="mail" iconPosition="left"
              placeholder="Email Adress" onChange={this.handleChange} value={email} 
              className={this.handleInputError(errors, 'email')}
              type="email" 
              />

              <Form.Input fluid name="senha" icon="lock" iconPosition="left"
              placeholder="Senha" onChange={this.handleChange} value={senha} 
              className={this.handleInputError(errors, 'senha')}
              type="password" 
              />

              <Form.Input fluid name="confirmaSenha" icon="repeat" iconPosition="left"
              placeholder="Confirma Senha" onChange={this.handleChange} value={confirmaSenha} 
              className={this.handleInputError(errors, 'senha')}
              type="password" 
              />

              <Button disabled={loading} className={loading ? 'loading' : ''} color="orange" fluid size="large">Enviar</Button>

            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Erro</h3>
              {this.mostrarErros(errors)}
            </Message>
          )}
          <Message>Já é um usuario? <Link to="/login">Login</Link></Message>

        </Grid.Column>
      </Grid>
    );
  }
}

export default Registro;