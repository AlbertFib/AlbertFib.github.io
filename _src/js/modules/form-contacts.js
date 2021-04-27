import customSelect from './custom-select';
import {sortContactData} from './table-contacts';

function createFormContacts(parent, contacts = []) {
  let lastSelectIndex = 0;
  let counterSelect = 0;
  contacts = sortContactData(contacts);

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

  customSelect(
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

export {createFormContacts, getContactsFromModal};