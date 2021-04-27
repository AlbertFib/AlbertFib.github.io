import {getData} from './fetch';
import {getZero} from './helpers';
import createClientContacts from './table-contacts';
import {openModal} from './modal';

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
    const clientContacts = createClientContacts(contacts);
  
    clientRow.innerHTML = `
      <td class="table__item">${id}</td>
      <td class="table__item">
      ${surname} ${name} ${lastName}
      </td>
      <td class="table__item">
        ${getZero( createdDate.getDate() )}.${getZero( createdDate.getMonth() + 1 )}.${createdDate.getFullYear()}
        <span class="table__time">
          ${getZero( createdDate.getHours() )}:${ getZero( createdDate.getMinutes() )}
        </span>
      </td>
      <td class="table__item">
      ${getZero( updatedDate.getDate() )}.${getZero( updatedDate.getMonth() + 1 )}.${updatedDate.getFullYear()}
        <span class="table__time">
          ${getZero( updatedDate.getHours() )}:${getZero( updatedDate.getMinutes() )}
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

    getData('http://localhost:3000/api/clients')
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
    return getData(`http://localhost:3000/api/clients/${id}`)
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

      openModal('edit', data);
    });
  }

  function _handlerRemoveBtn(target) {
    openModal('remove', { id: target.getAttribute('data-id') });
  }

  function _handlerAddBtn() {
    openModal('new');
  }

export {renderClientsList, loadClients};
export default table;