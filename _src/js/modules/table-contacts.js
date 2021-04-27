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

export default createClientContacts;
export {sortContactData};