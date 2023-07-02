import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import InfoTooltip from './InfoTooltip.jsx';

function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    console.log(props.onSuccess);
    console.log(props.onFail)

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
        props.onRegister(email, password)
    }
    
    return (
        <div className="register">
            <h2 className="register__heading">Регистрация</h2>
            <form className="register__form register__form-edit" name='signUp' onSubmit={handleSubmit}>
                <input
                    value={formValue.email || ''}
                    onChange={handleChange}
                    id="input-name"
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    className="register__input register__input_data_email"
                />
                <span id="input-email-error" className="register__error"></span>
                <input
                    value={formValue.password || ''}
                    onChange={handleChange}
                    id="input-password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                    minLength="6"
                    maxLength="200"
                    className="register__input register__input_data_password"
                />
                <span id="input-password-error" className="register__error"></span>
                <button type="submit" className="register__submit-button" value="Зарегистрироваться">Зарегистрироваться</button>
            </form>
            <div className="register__signin">
                <Link to="/sign-in" className="register__login-link">Уже зарегистрированы? Войти</Link>
            </div>
            < InfoTooltip isSuccess={props.onSuccess} isFail={props.onFail} onClose={props.onPopupClose} />
        </div>
      )
}

export default Register;