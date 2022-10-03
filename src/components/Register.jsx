import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import SignForm from './SignForm';

function Register(props) {
  const { onRegister } = props;
  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setState((oldState) => ({
      ...oldState,
      [name]: value
    }));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {password, email} = state;

    // здесь обработчик регистрации
    onRegister(password, email)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register">
      <Header>
        <Link to="/login" className="header__auth">Войти</Link>
      </Header>

      <SignForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
            type="text"
            id="register-email"
            name="register-email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="auth__input"
          />
          <input
            type="text"
            id="register-password"
            name="register-password"
            value={state.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="auth__input"
          />
      </SignForm>

      <div className="register__signin">
        <p>Уже зарегистрированы?</p>
        <Link to="/login" className="register__login-link">Войти</Link>
      </div>
    </div>

  )
}

export default Register;