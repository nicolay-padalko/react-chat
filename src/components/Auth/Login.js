import React from 'react';
import firebase from '../../firebase';

import { Grid, Form, Segment, Button, Header, Message, Icon } from
'semantic-ui-react';

import { Link } from 'react-router-dom';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    errors: [],
    loading: false,
  };

 

  displayErrors = errors => errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log(signedInUser);
        })
        .catch(err => {
          console.log(err );
          this.setState({
            errors: this.state.errors.concat(err),
            loading: false
          });
        });
    }
  };

 handleInputError = (errors, inputName) => {
   return errors.some(error =>
    error.message.toLowerCase().includes(inputName)
    )
    ? "error"
    : ""
 }

  render() {

    const { email, password, errors, loading } = this.state;
     
    return (
      <Grid textAlign="center" verticalAlign="middle" className="App">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="code branch" color="violet" />
              Login para UnipChat
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
             
              <Form.Input fluid name="email" icon="mail" iconPosition="left"
              placeholder="Email Adress" onChange={this.handleChange} value={email} 
              className={this.handleInputError(errors, 'email')}
              type="email" 
              />

              <Form.Input fluid name="password" icon="lock" iconPosition="left"
              placeholder="password" onChange={this.handleChange} value={password} 
              className={this.handleInputError(errors, 'password')}
              type="password" 
              />

              <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Enviar</Button>

            </Segment>
          </Form>
          {errors.length > 0 && (
            <Message error>
              <h3>Erro</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>Não tem conta? <Link to="/register">Register</Link></Message>

        </Grid.Column>
      </Grid>
    );
  }
}


export default Login;