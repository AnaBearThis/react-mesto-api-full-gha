import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from '../contexsts/CurrentUserContext.jsx';
import React from "react";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, props.isOpen]
    ); 

    function handleNameChange(e) {
        setName(e.target.value);
    };

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            me: name,
            job: description,
        });
    }

    return(
        <PopupWithForm
            title='Редактировать профиль'
            name='edit'
            textButton='Сохранить'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                value={name || ''}
                onChange={handleNameChange}
                id="input-name"
                type="text"
                name="name"
                placeholder="Введите имя"
                required
                minLength="2"
                maxLength="40"
                className="popup__input popup__input_data_name"
            />
            <span id="input-name-error" className="popup__error"></span>
            <input
                value={description || ''}
                onChange={handleDescriptionChange}
                id="input-job"
                type="text"
                name="description"
                placeholder="Введите название вашей работы"
                required
                minLength="2"
                maxLength="200"
                className="popup__input popup__input_data_description"
            />
            <span id="input-job-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;