'use strict';
import '../scss/main.scss';
import table from './modules/table';
import search from './modules/search';

document.addEventListener('DOMContentLoaded', () => {
  table(
    '.clients__table',
    'table__header_active',
    'table__header_active_reverse',
    '.table__btn_edit',
    '.table__btn_remove',
    'table__btn_edit_loading',
    'table__head'
    );
  search('.search__input', 300);    
});
