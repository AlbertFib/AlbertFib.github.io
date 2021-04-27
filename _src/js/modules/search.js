import {getData} from './fetch';
import {renderClientsList} from './table';

const search = (searchBarSelector, ms) => {
  const searchBar = document.querySelector(searchBarSelector); 
  let filterID;

  searchBar.addEventListener('input', () =>  {
    clearTimeout(filterID);

    filterID = setTimeout(() => {
      _getFilteredClients(searchBar.value)
      .then(data => {
        renderClientsList(data);
      });
    }, ms);
    
  });

  searchBar.parentElement.addEventListener('submit', (ev) => {
    ev.preventDefault();
  });

  async function _getFilteredClients(query) {
    return await getData(`http://localhost:3000/api/clients?search=${query}`);
  }
};

export default search;