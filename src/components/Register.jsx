import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Auth from './Auth';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // здесь обработчик регистрации
  }

  render() {
    return (
      <div className="register">
        <Header>
          <Link to="/login" className="header__auth">Войти</Link>
        </Header>

        <Auth
          name="register"
          title="Регистрация"
          buttonText="Зарегистрироваться"
          onSubmit={this.handleSubmit}
        >
          <input
              type="text"
              id="register-email"
              name="register-email"
              value={this.state.email}
              onChange={this.handleChange}
              placeholder="Email"
              required
              className="auth__input"
            />
            <input
              type="text"
              id="register-password"
              name="register-password"
              value={this.state.password}
              onChange={this.handleChange}
              placeholder="Пароль"
              required
              className="auth__input"
            />
        </Auth>

        <div className="register__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/login" className="register__login-link">Войти</Link>
        </div>
      </div>

    )
  }
}

export default Register;