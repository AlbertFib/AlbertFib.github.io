/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./_src/js/modules/custom-select.js":
/*!******************************************!*\
  !*** ./_src/js/modules/custom-select.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const customSelect = function(element, data) {  
  const templateSelect = (data = [], defaultText = 'Телефон') => {
    let items = [];

    data.forEach(item => {
      let classItemSelected = '';

      if (item === defaultText) {
        classItemSelected = 'select__item_selected';
      }

      items.push(`<li class="select__item ${classItemSelected}" data-select="item" tabindex="0">${item}</li>`);
    });

    return `
    <div class="select__backdrop" data-select="backdrop"></div>
    <button type="button" class="select__trigger" data-select="trigger">
      ${defaultText}
    </button>
    <div class="select__dropdown">
      <ul class="select__items">
        ${items.join('')}
      </ul>
    </div>`;
  };
  
  class CustomSelect {
    constructor(element, config) {
      this._$main = element;
      this._config = config || {};

      if (this._config.data) {
        this._render();
      }

      this._$trigger = this._$main.querySelector('[data-select="trigger"]');
      this._addEventListener();
    }

    _isShow() {
      return this._$main.classList.contains('select_show');
    }

    _changeItem(item) {
      if (!item.classList.contains('select__item_selected')) {
        const itemSelected = this._$main.querySelector('.select__item_selected');

        if (itemSelected) {
          itemSelected.classList.remove('select__item_selected');
        }

        item.classList.add('select__item_selected');
        this._$trigger.textContent = item.textContent;
        this._$main.dispatchEvent(this._changeValue);
        this._config.onSelected ? this._config.onSelected(item) : null;
      }
    }

    _eventHandler(e) {
      let $target = e.target;
      let type = $target.dataset.select;

      if (!type) {
        $target = $target.closest('[data-select]');
        type = $target.dataset.select;
      }      

      if (type === 'trigger') {
        this.toggle();
      } else if (type === 'item') {
        this._changeItem($target);
        this.hide();
      } else if (type === 'backdrop') {
        this.hide();
      }
    }

    _eventHandlerKeyboard(e) {
      if (e.keyCode === 0 || e.keyCode === 32 || e.keyCode === 13) {
        let $target = e.target;
        let type = $target.dataset.select;

        if (!type) {
          $target = $target.closest('[data-select]');
          type = $target.dataset.select;
        }
        
        if (type === 'item') {
          this._changeItem($target);
          this.hide();
        }
      }
    }

    _addEventListener() {
      this._eventHandler = this._eventHandler.bind(this);
      this._eventHandlerKeyboard = this._eventHandlerKeyboard.bind(this);
      this._$main.addEventListener('click', this._eventHandler);
      this._$main.addEventListener('keydown', this._eventHandlerKeyboard);
      this._changeValue = new CustomEvent('select.change');
    }

    _render() {
      
      if (!this._$main.classList.contains('select')) {
        this._$main.classList.add('select');
      }

      this._$main.innerHTML = templateSelect(this._config['data'], this._config['defaultValue']);
    }

    show() {
      this._$main.classList.add('select_show');
    }
    
    hide() {
      this._$main.classList.remove('select_show');
    }

    toggle() {
      this._isShow() ? this.hide() : this.show();
    }
    
    destroy() {
      this._$main.removeEventListener('click', this._eventHandler);
      this._$main.removeEventListener('keydown', this._eventHandlerSpacePress);
      this._$main.innerHTML = '';
    }

    selectedItem(value) {
      if (typeof value === 'object') {
        if (value['value']) {
          this._$main.querySelectorAll('[data-select="item"]').forEach($item => {
            if ($item.textContent.trim() === value['value'].toString()) {
              this._changeItem($item);
              return;
            }
          });
        } else if (value['index'] >= 0) {
          const $item = this._$main.querySelectorAll('[data-select="item"]')[value['index']];
          this._changeItem($item);
        }

        return this.selectedItem();
      }

      let indexSelected = -1;
      let valueSelected = '';

      this._$main.querySelectorAll('[data-select="item"]').forEach(($element, index) => {
        if ($element.classList.contains('select__item_selected')) {
          indexSelected = index;
          valueSelected = $element.textContent;
        }
      });

      return { index: indexSelected, value: valueSelected };
    }
  }

  return new CustomSelect(element, data);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (customSelect);

/***/ }),

/***/ "./_src/js/modules/fetch.js":
/*!**********************************!*\
  !*** ./_src/js/modules/fetch.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "patchData": () => (/* binding */ patchData),
/* harmony export */   "deleteData": () => (/* binding */ deleteData)
/* harmony export */ });
async function getData(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  }

  return await response.json();
}

async function postData(url, data) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

async function patchData(url, data) {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

async function deleteData(url) {
  const response = await fetch(url, {
    method: 'DELETE'
  });

  return await response.json();
}



/***/ }),

/***/ "./_src/js/modules/form-contacts.js":
/*!******************************************!*\
  !*** ./_src/js/modules/form-contacts.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFormContacts": () => (/* binding */ createFormContacts),
/* harmony export */   "getContactsFromModal": () => (/* binding */ getContactsFromModal)
/* harmony export */ });
/* harmony import */ var _custom_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-select */ "./_src/js/modules/custom-select.js");
/* harmony import */ var _table_contacts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table-contacts */ "./_src/js/modules/table-contacts.js");



function createFormContacts(parent, contacts = []) {
  let lastSelectIndex = 0;
  let counterSelect = 0;
  contacts = (0,_table_contacts__WEBPACK_IMPORTED_MODULE_1__.sortContactData)(contacts);

  const addBtn = parent.querySelector('.form-contacts__add');
    

  contacts.forEach(({type, value}, index) => {     
    _createContact(parent, addBtn, index, {type, value});
    
    lastSelectIndex = index;
    counterSelect = index + 1;
  });

  parent.addEventListener('click', (ev) => {
    const target = ev.target;
    if (target && target.matches('.form-contacts__remove')) {
      target.parentElement.remove();
      
      if (--counterSelect < 10) {
        addBtn.classList.remove('is-hidden');
      }
      
      parent.classList.toggle('form-contacts_empty', counterSelect === 0);
    }
  });

  addBtn.addEventListener('click', () => {   
    _createContact(parent, addBtn, ++lastSelectIndex);

    if (++counterSelect === 10) {
      addBtn.classList.add('is-hidden');
    }

    parent.classList.toggle('form-contacts_empty', counterSelect === 0);
  });

  return parent;
}

function _createContact(parent, lastElement, index, {type = '', value = ''} = {}) {
  const typesContact = ['Телефон', 'Email', 'Facebook', 'Vk', 'Другое'];

  lastElement.insertAdjacentHTML('beforebegin', `
    <div class="form-contacts__item-wrapper">
      <div class="select" id="select-${index}"></div>
      <input class="form-contacts__input" type="text" name="value" placeholder="Введите данные контакта" value="${value}">
      <button class="form-contacts__remove" type="button">Удалить контакт</button>
    </div>
  `); 

  (0,_custom_select__WEBPACK_IMPORTED_MODULE_0__.default)(
    parent.querySelector(`#select-${index}`), 
  { 
    defaultValue: type ? type : typesContact[0],
    data: typesContact
  });
}

function getContactsFromModal(parent, errorDisplay) {
  const contacts = parent.querySelectorAll('.form-contacts__item-wrapper');
  const contactsData = [];

  contacts.forEach(contact => {
    const type = contact.querySelector('.select__trigger').textContent.trim();
    const value = contact.querySelector('.form-contacts__input').value;

    if (value === '') {
      throw new Error('Не все добавленные контакты полностью заполнены');
    }

    errorDisplay.textContent = '';
    contactsData.push({type, value});
  });

  return contactsData;
}



/***/ }),

/***/ "./_src/js/modules/helpers.js":
/*!************************************!*\
  !*** ./_src/js/modules/helpers.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
function getZero(num) {
  return (num < 10) ? `0${num}` : num;
}



/***/ }),

/***/ "./_src/js/modules/modal.js":
/*!**********************************!*\
  !*** ./_src/js/modules/modal.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./_src/js/modules/fetch.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table */ "./_src/js/modules/table.js");
/* harmony import */ var _form_contacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./form-contacts */ "./_src/js/modules/form-contacts.js");




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
  
  (0,_form_contacts__WEBPACK_IMPORTED_MODULE_2__.createFormContacts)(formContactsElement);

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
      const contacts = (0,_form_contacts__WEBPACK_IMPORTED_MODULE_2__.getContactsFromModal)(formContactsElement, errorDisplay);

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

        (0,_table__WEBPACK_IMPORTED_MODULE_1__.loadClients)();
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

  (0,_form_contacts__WEBPACK_IMPORTED_MODULE_2__.createFormContacts)(formContactsElement, contacts);

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
      const contacts = (0,_form_contacts__WEBPACK_IMPORTED_MODULE_2__.getContactsFromModal)(formContactsElement, errorDisplay);

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
  
        (0,_table__WEBPACK_IMPORTED_MODULE_1__.loadClients)();
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
      (0,_table__WEBPACK_IMPORTED_MODULE_1__.loadClients)();
      closeModal();
    });;
  });

  return parent;
}

function _deleteClient(id) {
  return (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.deleteData)(`http://localhost:3000/api/clients/${id}`)
  .catch(err => {
    console.log(err);
  });      
}

function _updateClient(id, clientData) {
  return (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.patchData)(`http://localhost:3000/api/clients/${id}`, clientData)
  .catch(err => {
    console.log(err);
  });
}

function _addClient(clientData) {
    return (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/api/clients', clientData)
    .catch(err => {
      console.log(err);
    });
}






/***/ }),

/***/ "./_src/js/modules/search.js":
/*!***********************************!*\
  !*** ./_src/js/modules/search.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./_src/js/modules/fetch.js");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./table */ "./_src/js/modules/table.js");



const search = (searchBarSelector, ms) => {
  const searchBar = document.querySelector(searchBarSelector); 
  let filterID;

  searchBar.addEventListener('input', () =>  {
    clearTimeout(filterID);

    filterID = setTimeout(() => {
      _getFilteredClients(searchBar.value)
      .then(data => {
        (0,_table__WEBPACK_IMPORTED_MODULE_1__.renderClientsList)(data);
      });
    }, ms);
    
  });

  searchBar.parentElement.addEventListener('submit', (ev) => {
    ev.preventDefault();
  });

  async function _getFilteredClients(query) {
    return await (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.getData)(`http://localhost:3000/api/clients?search=${query}`);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (search);

/***/ }),

/***/ "./_src/js/modules/table-contacts.js":
/*!*******************************************!*\
  !*** ./_src/js/modules/table-contacts.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "sortContactData": () => (/* binding */ sortContactData)
/* harmony export */ });
function createClientContacts(data, ...classNames) {
  data = sortContactData(data);

  let contactsList = document.createElement('ul');  
  
  if (!classNames.length) {
    classNames = ['table__contacts'];
  }  

  contactsList.classList.add('contacts', ...classNames);

  if (data.length > 5) {
    for (let i = 0; i < 4; i++) {
      _addContact(contactsList, data[i].type, data[i].value);
    }

    const moreContactsBtn = document.createElement('li');
    moreContactsBtn.classList.add('contacts__item', 'contacts__item_more');  
    moreContactsBtn.textContent = `+${data.length - 4}`;

    _addEventMoreBtn(contactsList, moreContactsBtn, data);  
    contactsList.append(moreContactsBtn);

    return contactsList;
  }

  data.forEach(({ type, value }) => {
    _addContact(contactsList, type, value);
  });

  return contactsList;
}

function _addEventMoreBtn(parent, element, data) {
  element.addEventListener('click', () => {
    element.remove();

    for (let i = 4; i < data.length; i++) {
      _addContact(parent, data[i].type, data[i].value);
    }
  }, {once: true});

}

function _addContact(parent, type, value) {
  const newContact = _createContact(type, value);
  parent.append(newContact);
}

function _createContact(type, value) {
  const contact = document.createElement('li');
  contact.classList.add('contacts__item');

  let additionalClass = '';

  contact.textContent = `Контакт ${type} со значением ${value}`;   
  contact.setAttribute('data-tooltip', `${type}: ${value}`);  
  
  switch (type) {
    case 'Телефон':
      additionalClass = 'contacts__item_phone';
      contact.innerHTML = `
        <a class="contacts__link" href="tel:${value}" target="_blank">
          Контакт ${type} со значением ${value}
        </a>
      `;      
      break;

    case 'Email':
      additionalClass = 'contacts__item_email';
      contact.innerHTML = ` 
        <a class="contacts__link" href="mailto:${value}" target="_blank">
          Контакт ${type} со значением ${value}
        </a>
      `;
      break;

    case 'Facebook':
      additionalClass = 'contacts__item_fb';
      contact.innerHTML = `
        <a class="contacts__link" href="https://facebook.com/${value}" target="_blank">
          Контакт ${type} со значением ${value}
        </a>
      `;
      break;

    case 'Vk':
      additionalClass = 'contacts__item_vk';
      contact.innerHTML = `
        <a class="contacts__link" href="https://vk.com/${value}" target="_blank">
          Контакт ${type} со значением ${value}
        </a>
      `;
      break;
  }      

  if (additionalClass) {
    contact.classList.add(additionalClass);
  }
 
  return contact;
}

function sortContactData(data) {
  const sortedData = [];
  const types = ['Vk', 'Facebook', 'Телефон', 'Email'];

  for (let i = 0; i < types.length; i++) {
    sortedData.push(...data.filter(item => item.type === types[i]));
  }

  data.forEach(item => {
    if (item.type !== 'Vk' && item.type !== 'Facebook' && item.type !== 'Телефон' && item.type !== 'Email') {
      sortedData.push(item);
    }
  });

  return sortedData;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createClientContacts);


/***/ }),

/***/ "./_src/js/modules/table.js":
/*!**********************************!*\
  !*** ./_src/js/modules/table.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderClientsList": () => (/* binding */ renderClientsList),
/* harmony export */   "loadClients": () => (/* binding */ loadClients),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "./_src/js/modules/fetch.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./_src/js/modules/helpers.js");
/* harmony import */ var _table_contacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-contacts */ "./_src/js/modules/table-contacts.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal */ "./_src/js/modules/modal.js");





  let clients = null;

  function table(parentSelector, activeClass, reverseClass,editBtnSelector, removeBtnSelector, loadingClass, ...classNames) {
    _createHeaders(parentSelector, activeClass, reverseClass, classNames);
    loadClients(parentSelector, activeClass, reverseClass,editBtnSelector, removeBtnSelector, loadingClass);

    document.querySelector('.clients__btn').addEventListener('click', _handlerAddBtn);
  }   

  //Headers
  function _createHeaders(
    parentSelector = '.clients__table',
    activeClass = 'table__header_active',
    reverseClass = 'table__header_active_reverse',         
    ...classNames
    ) {
    if (classNames.length === 0) {
      classNames = ['table__head'];
    }
  
    const headers = document.createElement('thead');
    headers.classList.add(...classNames); 
  
    headers.innerHTML = `
    <tr class="table__row">
      <th class="table__header  table__header_active  table__header_active_reverse" data-header="id">ID</th>
      <th class="table__header" data-header="fullname">Фамилия Имя Отчество</th>
      <th class="table__header" data-header="creation-date">Дата и время создания</th>
      <th class="table__header" data-header="modified-date">Последние изменения</th>
      <th class="table__header">Контакты</th>
      <th class="table__header">Действия</th>
    </tr>
    `;

    headers.addEventListener('click', (ev) => {
      const target = ev.target;   
      
      if (target && target.matches(`[data-header]`)) {
        const isReverse = target.classList.contains(reverseClass);    
      
        _toggleActiveHeader(target, isReverse, activeClass, reverseClass);
        renderClientsList(clients);
      }
    });
  
    document.querySelector(parentSelector).append(headers);
  }

  
  function _toggleActiveHeader(target, isReverse, activeClass, reverseClass) {
    const interactiveHeaders = document.querySelectorAll(`[data-header]`);
  
    interactiveHeaders.forEach(header => {
      header.classList.remove(activeClass, reverseClass);
    });  
  
    target.classList.add(activeClass);
  
    if (!isReverse) {
      target.classList.add(reverseClass);
    }
  }

  //Clients
  function renderClientsList(
    data, 
    parentSelector = '.clients__table',
    activeClass = 'table__header_active',
    reverseClass = 'table__header_active_reverse',
    editBtnSelector = '.table__btn_edit', 
    removeBtnSelector = '.table__btn_remove', 
    loadingClass = 'table__btn_edit_loading',  
    ) {    
    const parent = document.querySelector(parentSelector);
    
    if (parent.querySelector('tbody')) {
      parent.querySelector('tbody').remove();
    }      

    const clientsData = document.createElement('tbody');    
    clientsData.classList.add('table__data'); 

    const sortedData = _sortClients(data, activeClass, reverseClass);

    sortedData.forEach(item => {
      clientsData.append( _createClient(item) );
    });    

    clientsData.addEventListener('click', (ev) => {
      const target = ev.target;
  
      if (target && target.matches(editBtnSelector)) {
        _handlerEditBtn(target, loadingClass);
      }
  
      if (target && target.matches(removeBtnSelector)) {
        _handlerRemoveBtn(target);
      }
    }); 

    parent.append(clientsData); 
  }

  function _createClient(  
    {
      id = '000000',
      name = 'Test',
      surname = 'Test',
      lastName = 'Test',
      createdAt = '2021-01-01T00:00:00.0Z',
      updatedAt = '2021-01-01T00:00:00.0Z',
      contacts
    } = {}
    ) {

    const clientRow = document.createElement('tr');    
    clientRow.classList.add('table__row');
    
    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);  
    const clientContacts = (0,_table_contacts__WEBPACK_IMPORTED_MODULE_2__.default)(contacts);
  
    clientRow.innerHTML = `
      <td class="table__item">${id}</td>
      <td class="table__item">
      ${surname} ${name} ${lastName}
      </td>
      <td class="table__item">
        ${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( createdDate.getDate() )}.${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( createdDate.getMonth() + 1 )}.${createdDate.getFullYear()}
        <span class="table__time">
          ${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( createdDate.getHours() )}:${ (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( createdDate.getMinutes() )}
        </span>
      </td>
      <td class="table__item">
      ${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( updatedDate.getDate() )}.${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( updatedDate.getMonth() + 1 )}.${updatedDate.getFullYear()}
        <span class="table__time">
          ${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( updatedDate.getHours() )}:${(0,_helpers__WEBPACK_IMPORTED_MODULE_1__.getZero)( updatedDate.getMinutes() )}
        </span>
      </td>
      <td class="table__item" data-contacts>
      </td>
      <td class="table__item">
        <button class="table__btn table__btn_edit" data-id=${id}>Изменить</button>
        <button class="table__btn table__btn_remove" data-id=${id}>Удалить</button>
      </td>         
    `;

    clientRow.querySelector('[data-contacts]').insertAdjacentElement('afterbegin', clientContacts);        
    return clientRow;
  }

  function _sortClients(data, activeClass, reverseClass) {
    const headers = document.querySelectorAll('[data-header]');

    let sortType = null;
    let isReverse = null;

    headers.forEach(header => {
      if (header.classList.contains(activeClass)) {
        sortType = header.getAttribute('data-header');
        isReverse = header.classList.contains(reverseClass);
      }
    });

    if (sortType === 'id') {
      const result = data.sort((a, b) => a.id - b.id);
      return (isReverse) ? result : result.reverse();
    }

    if (sortType === 'fullname') {
      const result = data.sort((a, b) => {
        const nameA = `${a.surname} ${a.name} ${a.lastName}`;
        const nameB = `${b.surname} ${b.name} ${b.lastName}`;  

        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      });
      
      return (isReverse) ? result : result.reverse();
    }

    if (sortType === 'creation-date') {
      const result = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));      
      return (isReverse) ? result : result.reverse();
    }

    if (sortType === 'modified-date') {
      const result = data.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));      
      return (isReverse) ? result : result.reverse();
    }
  }

  function loadClients(parentSelector, activeClass, reverseClass, editBtnSelector, removeBtnSelector, loadingClass) {
    const placeholder = document.querySelector('.data-placeholder');
    placeholder.classList.remove('is-hidden');

    (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/api/clients')
    .then((data) => {
      placeholder.classList.add('is-hidden');
      clients = data;

      renderClientsList(clients, parentSelector, activeClass, reverseClass, editBtnSelector, removeBtnSelector, loadingClass);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function _getClientData(id) {
    return (0,_fetch__WEBPACK_IMPORTED_MODULE_0__.getData)(`http://localhost:3000/api/clients/${id}`)
    .catch(err => {
      console.log(err);
    });
  }

  function _handlerEditBtn(target, loadingClass) {
    target.classList.add(loadingClass);
    
    target.insertAdjacentHTML('afterbegin', `
      <svg class="spinner" viewBox="0 0 50 50">
        <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
      </svg>
    `);

    _getClientData(target.getAttribute('data-id'))
    .then(data => {
      target.classList.remove(loadingClass);
      target.textContent = 'Изменить';

      (0,_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('edit', data);
    });
  }

  function _handlerRemoveBtn(target) {
    (0,_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('remove', { id: target.getAttribute('data-id') });
  }

  function _handlerAddBtn() {
    (0,_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)('new');
  }


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (table);

/***/ }),

/***/ "./_src/scss/main.scss":
/*!*****************************!*\
  !*** ./_src/scss/main.scss ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./_src/js/main.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/main.scss */ "./_src/scss/main.scss");
/* harmony import */ var _modules_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/table */ "./_src/js/modules/table.js");
/* harmony import */ var _modules_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/search */ "./_src/js/modules/search.js");





document.addEventListener('DOMContentLoaded', () => {
  (0,_modules_table__WEBPACK_IMPORTED_MODULE_1__.default)(
    '.clients__table',
    'table__header_active',
    'table__header_active_reverse',
    '.table__btn_edit',
    '.table__btn_remove',
    'table__btn_edit_loading',
    'table__head'
    );
  (0,_modules_search__WEBPACK_IMPORTED_MODULE_2__.default)('.search__input', 300);    
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map