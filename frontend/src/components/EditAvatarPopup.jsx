import PopupWithForm from "./PopupWithForm.jsx";
import React from "react";

function EditAvatarPopup(props) {
    const avatarLink = React.useRef();

    React.useEffect(() => {
        avatarLink.current.value = ''; 
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarLink.current.value,
        });
      }

    return(  
        <PopupWithForm
            title='Обновить аватар'
            name='change-av'
            textButton='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                ref={avatarLink}
                id="input-link-av"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required 
                className="popup__input popup__input_data_link"
            />
            <span id="input-link-av-error" className="popup__error"></span>
        </PopupWithForm>
    )    
}

export default EditAvatarPopup;