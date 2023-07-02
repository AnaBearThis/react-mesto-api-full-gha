function ImagePopup(props) {
    return (
        <div className={`popup popup_type_view ${props.card.link && 'popup_opened'}`}>
              <div className="popup__container popup__container_type_view">   
                  <img className="popup__big-picture" src={`${props.card.link}`} alt={props.card.name}/>
                  <h2 className="popup__place-name">{props.card.name}</h2>
                  <button className="popup__close-button popup__close-button_type_view" type="button" aria-label="закрыть" onClick={props.onClose}></button>
              </div>
        </div>
    )
}

export default ImagePopup;