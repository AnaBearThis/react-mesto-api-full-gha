function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <h2 className="popup__heading">{props.title}</h2>
                <form className="popup__form popup__form-edit" name={props.name} onSubmit={props.onSubmit}>
                      {props.children}
                      <button type="submit" className="popup__submit-button" value={props.textButton}>{props.textButton}</button>
                  </form> 
                <button className="popup__close-button" type="button" aria-label="закрыть" onClick={props.onClose} />
            </div>
        </div>
    )
};

export default PopupWithForm;