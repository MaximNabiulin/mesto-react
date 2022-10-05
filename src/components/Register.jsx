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

    onRegister(password, email)
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="register">
      <Header>
        <Link to="/login" className="header__link">Войти</Link>
      </Header>

      <SignForm
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
            type="email"
            id="register-email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="auth__input"
          />
          <input
            type="password"
            id="register-password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="auth__input"
          />
      </SignForm>

      <div className="register__signin">
        <p className='register__text'>Уже зарегистрированы?</p>
        <Link to="/login" className="register__text register__login-link">Войти</Link>
      </div>
    </div>

  )
}

export default Register;

// beelzeboss.max@yandex.ru
// Bonedrums123