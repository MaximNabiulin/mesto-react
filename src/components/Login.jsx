import React from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import SignForm from './SignForm';

const initValues = {
  email: '',
  password: '',
}
function Login(props) {
  const { onLogin } = props;
  const [state, setState] = React.useState(initValues);

  const handleChange = (evt) => {
    const {name, value} = evt.target;
    setState((oldState) => ({
      ...oldState,
      [name]: value
    }));
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const {password, email} = state;
    if (!password || !email) return;

    onLogin(password, email)
      // .then(() => {
      //   setState(initValues);
      // })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="login">
      <Header>
        <Link to="/register" className="header__link">Регистрация</Link>
      </Header>

      <SignForm
        name="login"
        title="Вход"
        buttonText="Войти"
        onSubmit={handleSubmit}
      >
        <input
            type="email"
            id="login-email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="auth__input"
          />
          <input
            type="password"
            id="login-password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Пароль"
            required
            className="auth__input"
          />
      </SignForm>
    </div>
  );
}

export default Login;