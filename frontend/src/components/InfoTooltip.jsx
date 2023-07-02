import React from "react";
import successPic from '../images/success.png';
import failPic from '../images/fail.png';

function InfoTooltip (props) {
    const [iconSrc, setIconSrc] = React.useState('');
    const [tipText, setTipText] = React.useState('');

    const success = props.isSuccess;
    const fail = props.isFail;

    console.log(success);
    console.log(fail);

    React.useEffect(() => {
        if (success) {
            setIconSrc(successPic);
            setTipText('Вы успешно зарегистрировались!');
        }
    }, [success])

    React.useEffect(() => {
        if (fail) {
            setIconSrc(failPic);
            setTipText('Что-то пошло не так! Попробуйте ещё раз.');
        }
    }, [fail])

    console.log(iconSrc);
    console.log(tipText);

    return (
        <div className={`popup popup_type_login ${(success || fail) && 'popup_opened'}`}>
              <div className="popup__container popup__container_type_login">   
                  <img className="popup__icon" src={iconSrc} alt={tipText}/>
                  <h2 className="popup__infoTip">{tipText}</h2>
                  <button className="popup__close-button popup__close-button_type_view" type="button" aria-label="закрыть" onClick={props.onClose}></button>
              </div>
        </div>
    )
}

export default InfoTooltip;