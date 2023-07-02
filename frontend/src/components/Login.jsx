import React, {useState} from 'react';

function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
    
        setFormValue({
          ...formValue,
          [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formValue;
        props.onLogin(email, password);
        setFormValue({email: '', password: ''})
    }

    return (
        <div className="login">
            <h2 className="login__heading">Вход</h2>
            <form className="login__form" name='signIn' onSubmit={handleSubmit}>
                <input
                    value={formValue.email}
                    onChange={handleChange}
                    id="input-username"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    className="login__input login__input_data_email"
                />
                <span id="input-email-error" className="login__error"></span>
                <input
                    value={formValue.password}
                    onChange={handleChange}
                    id="input-password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                    minLength="6"
                    maxLength="200"
                    className="login__input login__input_data_password"
                />
                <span id="input-password-error" className="login__error"></span>
                <button type="submit" className="login__submit-button" value="войти">Войти</button>
            </form>
        </div>
      )
}

export default Login;