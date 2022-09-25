import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Header from './Header';
import Auth from './Auth';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(e){
    e.preventDefault();
    // здесь обрабатываем вход в систему
  }

  render() {
    return (
      <div className="login">
        <Header>
          <Link to="/register" className="header__auth">Регистрация</Link>
        </Header>

        <Auth
          name="login"
          title="Вход"
          buttonText="Войти"
          onSubmit={this.handleSubmit}
        >
          <input
              type="text"
              id="login-email"
              name="login-email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
              required
              className="auth__input"
            />
            <input
              type="text"
              id="login-password"
              name="login-password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Пароль"
              required
              className="auth__input"
            />
        </Auth>
      </div>
    );
  }
}

export default withRouter(Login);