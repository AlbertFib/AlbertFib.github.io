import {deleteData, postData, patchData} from './fetch';
import {loadClients} from './table';
import {createFormContacts, getContactsFromModal} from './form-contacts';

function openModal(type, client = {}) {
  const modal = document.querySelector('.modal');
  modal.classList.remove('is-hidden');
  document.body.classList.add('is-scroll-fixed');

  modal.append( _createModal(type, client) );
}

function closeModal() {
  const modal = document.querySelector('.modal');

  modal.innerHTML = '';
  modal.classList.add('is-hidden');
  document.body.classList.remove('is-scroll-fixed');
}

function _createModal(type, {id, name, surname, lastName, contacts = []}) {
  let modalBody = document.createElement('div');
  modalBody.classList.add('modal__body');

  if (type === 'new') {
    modalBody = _createNewModal(modalBody);
  }

  if (type === 'edit') {
    modalBody = _createEditModal(modalBody, {id, name, surname, lastName, contacts});    
  }

  if (type === 'remove') {
    modalBody = _createRemoveModal(modalBody, id);
  }

  modalBody.addEventListener('click', (ev) => {
    const target = ev.target;

    if (target && (target === modalBody || target.matches('.modal__close') || target.matches('.modal__cancel'))) {
      closeModal();
    }
  });

  return modalBody;
}

function _createNewModal(parent) {
  parent.innerHTML = `
  <div class="modal__content" data-modal="new">
    <button class="modal__close">Закрыть</button>
    <h1 class="modal__title modal__title_new">Новый клиент</h1>
    <form class="form">
      <div class="form__wrapper_input form__wrapper_input_new">
        <input class="form__input form__input_new" id="new-surname" type="text" name="surname" placeholder=" ">
        <label class="form__label form__label_new" for="new-surname">
          Фамилия<span class="form__mark">*</span>
        </label>  
      </div>
      <div class="form__wrapper_input form__wrapper_input_new">
        <input class="form__input form__input_new" id="new-name" type="text" name="name" placeholder=" ">
        <label class="form__label form__label_new" for="new-name">
          Имя<span class="form__mark">*</span>
        </label>  
      </div>   
      <div class="form__wrapper_input form__wrapper_input_new">
        <input class="form__input form__input_new" id="new-middle-name" type="text" name="middle-name" placeholder=" ">
        <label class="form__label form__label_new" for="new-middle-name">
          Отчество                
        </label> 
      </div>
      <div class="form-contacts form-contacts_empty">
        
        <button class="form-contacts__add" type="button">Добавить контакт</button>
      </div>
      <p class="modal__error-message"></p>
      <button class="modal__btn modal__btn_save" type="button">Сохранить</button>
    </form>          
    <button class="modal__cancel">Отмена</button>
  </div>    
  `;

  const formContactsElement = parent.querySelector('.form-contacts');
  const errorDisplay = parent.querySelector('.modal__error-message');
  
  createFormContacts(formContactsElement);

  parent.querySelector('.modal__btn_save').addEventListener('click', function() {
    const name = parent.querySelector('#new-name').value;
    const surname = parent.querySelector('#new-surname').value;
    const lastName = parent.querySelector('#new-middle-name').value;

    this.insertAdjacentHTML('afterbegin', `
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    `);
    this.classList.add('modal__btn_loading');

    try {
      const contacts = getContactsFromModal(formContactsElement, errorDisplay);

      _addClient({name, surname, lastName, contacts})
      .then((data) => {
        this.textContent = 'Сохранить';
        this.classList.remove('modal__btn_loading');
        errorDisplay.textContent = '';

        if (data.errors) {
          data.errors.forEach(error => {
            errorDisplay.innerHTML += error.message + '<br>';
          });
          return;
        }

        loadClients();
        closeModal();
      });
    } catch (err) {
      errorDisplay.innerHTML = err.message + '<br>';
    }
  });

  return parent;
}

function _createEditModal(parent, {id, name, surname, lastName, contacts}) {
  parent.innerHTML = `
    <div class="modal__content" data-modal="edit">
      <button class="modal__close">Закрыть</button>
      <h1 class="modal__title modal__title_edit">Изменить данные</h1>
      <span class="modal__id">ID: ${id}</span>
      <form class="form">
        <div class="form__wrapper_input form__wrapper_input_edit">
          <label class="form__label form__label_edit" for="edit-surname">
            Фамилия<span class="form__mark">*</span>
          </label> 
          <input class="form__input" id="edit-surname" type="text" name="surname" value="${surname}">
        </div>
        <div class="form__wrapper_input form__wrapper_input_edit">
          <label class="form__label form__label_edit" for="edit-name">
            Имя<span class="form__mark">*</span>
          </label>  
          <input class="form__input" id="edit-name" type="text" name="name" value="${name}">
        </div>  
        <div class="form__wrapper_input form__wrapper_input_edit">
          <label class="form__label form__label_edit" for="edit-middle-name">
            Отчество                
          </label> 
          <input class="form__input" id="edit-middle-name" type="text" name="middle-name" value="${lastName}">
        </div>
        <div class="form-contacts">
          
          <button class="form-contacts__add" type="button">Добавить контакт</button>
        </div>
        <p class="modal__error-message"></p>
        <button class="modal__btn modal__btn_save" type="button">Сохранить</button>
      </form>          
      <button class="modal__remove">Удалить клиента</button>
    </div>
  `;

  const formContactsElement = parent.querySelector('.form-contacts');
  const errorDisplay = parent.querySelector('.modal__error-message');

  if (contacts.length === 0) {
    formContactsElement.classList.add('form-contacts_empty');
  } 

  createFormContacts(formContactsElement, contacts);

  parent.querySelector('.modal__remove').addEventListener('click', () => {
    closeModal();
    openModal('remove', {id});
  });

  parent.querySelector('.modal__btn_save').addEventListener('click', function() {
    name = parent.querySelector('#edit-name').value;
    surname = parent.querySelector('#edit-surname').value;
    lastName = parent.querySelector('#edit-middle-name').value;

    this.insertAdjacentHTML('afterbegin', `
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    `);
    this.classList.add('modal__btn_loading');

    try {
      const contacts = getContactsFromModal(formContactsElement, errorDisplay);

      _updateClient(id, {name, surname, lastName, contacts})
      .then((data) => {
        this.textContent = 'Сохранить';
        this.classList.remove('modal__btn_loading');        
        errorDisplay.textContent = '';
  
        if (data.errors) {
          data.errors.forEach(error => {
            errorDisplay.innerHTML += error.message + '<br>';
          });
          return;
        }
  
        loadClients();
        closeModal();
      });
    } catch (err) {
      errorDisplay.innerHTML = err.message + '<br>';
    }    
  });

  return parent;
}

function _createRemoveModal(parent, id) {
  parent.innerHTML = `
    <div class="modal__content" data-modal="remove">
      <button class="modal__close">Закрыть</button>
      <h1 class="modal__title modal__title_remove">Удалить клиента</h1>
      <p class="modal__text modal__text_remove">
        Вы действительно хотите удалить данного клиента?
      </p>
      <button class="modal__btn modal__btn_remove" type="button">Удалить</button>                 
      <button class="modal__cancel">Отмена</button>
    </div>
  `;

  parent.querySelector('.modal__btn_remove').addEventListener('click', function() {
    this.insertAdjacentHTML('afterbegin', `
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    `);
    this.classList.add('modal__btn_loading');
    
    _deleteClient(id)
    .then(() => {
      this.textContent = 'Удалить';
      this.classList.remove('modal__btn_loading');
      loadClients();
      closeModal();
    });;
  });

  return parent;
}

function _deleteClient(id) {
  return deleteData(`http://localhost:3000/api/clients/${id}`)
  .catch(err => {
    console.log(err);
  });      
}

function _updateClient(id, clientData) {
  return patchData(`http://localhost:3000/api/clients/${id}`, clientData)
  .catch(err => {
    console.log(err);
  });
}

function _addClient(clientData) {
    return postData('http://localhost:3000/api/clients', clientData)
    .catch(err => {
      console.log(err);
    });
}


export {openModal, closeModal};

