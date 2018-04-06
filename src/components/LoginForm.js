// @flow

import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

type LoginFormProps = {
  doLogin: (name: string, password: string) => void;
  error: string | null;
};

type LoginFormDefaultProps = {
  error: string | null;
};

type LoginFormState = {
  loading: boolean;
  username: string;
  password: string;
};

export default class LoginForm extends React.Component<LoginFormDefaultProps, LoginFormProps, LoginFormState> {
  static defaultProps = {
    error: null,
  };

  static displayName = 'LoginForm';

  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
    };
    (this: any).handleClick = this.handleClick.bind(this);
    (this: any).updateUsername = this.updateUsername.bind(this);
    (this: any).updatePassword = this.updatePassword.bind(this);
  }

  state: LoginFormState;

  handleClick(event: Event) {
    this.props.doLogin(this.state.username, this.state.password);
    event.preventDefault();
  }

  updateUsername(event: Event & { currentTarget: HTMLInputElement }) {
    this.setState({
      username: event.currentTarget.value,
    });
  }

  updatePassword(event: Event & { currentTarget: HTMLInputElement }) {
    this.setState({
      password: event.currentTarget.value,
    });
  }

  render() {
    const error = this.props.error ? (
      <Alert bsStyle="danger">
        {this.props.error}
      </Alert>
    ) : null;
    const formValidationState = this.props.error ? 'error' : null;

    return (
      <Form>
        {error}
        <FormGroup controlId="usernameText" validationState={formValidationState}>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            type="text"
            value={this.state.username}
            onChange={this.updateUsername}
            autoComplete="username"
          />
        </FormGroup>
        <FormGroup controlId="passwordText" validationState={formValidationState}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.updatePassword}
            autoComplete="current-password"
          />
        </FormGroup>
        <Button
          type="submit"
          disabled={this.state.loading}
          onClick={!this.state.loading ? this.handleClick : null}
        >
          {this.state.loading ? 'Logging In\u2026' : 'Log In'}
        </Button>
      </Form>
    );
  }
}
