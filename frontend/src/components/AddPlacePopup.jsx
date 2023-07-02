import PopupWithForm from "./PopupWithForm.jsx";
import React from "react";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen]);

    function handleNameChange(e) {
        setName(e.target.value);
    };

    function handleLinkChange(e) {
        setLink(e.target.value)
    };

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddNewPlace({
            name: name,
            link: link
        });
    };

    return (
        <PopupWithForm
            title='Новое место'
            name='add'
            textButton='Создать'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                value={name || ''}
                onChange={handleNameChange}
                id="input-place"
                type="text"
                name="name"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
                className="popup__input popup__input_data_place"
            />
            <span id="input-place-error" className="popup__error"></span>
            <input
                value={link}
                onChange={handleLinkChange}
                id="input-link"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required 
                className="popup__input popup__input_data_link"
            />
            <span id="input-link-error" className="popup__error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;