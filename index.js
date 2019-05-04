'use strict';

const STORE = {
    items: [
        {id: cuid(), name: 'dishwasher-soap', checked: false},
        {id: cuid(), name: 'oranges', checked: false},
        {id: cuid(), name: 'milk', checked: true},
        {id: cuid(), name: 'bread', checked: false}
    ],
    hideCompleted: false,
    searchTerm: null
};

function iterateStore(shop) {
  return shop.map(obj => obj.hasOwnProperty('id')? generateItemHtml(obj) : 'missing input');

}

function generateItemHtml(obj) {
  let renderedItem = ` <li id='${obj.id}'>
  <span class="shopping-item ${obj.checked ? "shopping-item__checked" : ""}" >${obj.name}</span>
  <div class="shopping-item-controls">
    <button class="shopping-item-edit">
      <span class="button-label">edit </span>
    </button>
    <button class="shopping-item-check">
      <span class="button-label">check</span>
    </button>
    <button class="shopping-item-delete">
      <span class="button-label">delete</span>
    </button>
  </div>
  </li>`;
  return renderedItem;
}

function renderShoppingList(){
    let filteredList = STORE.items;

    if (STORE.searchTerm) {
        filteredList = filterBySearchTerm(STORE.searchTerm);
    }
    
    if (STORE.hideCompleted === true) {
     filteredList = filterByChecked(STORE.hideCompleted);
    } 

    const html = iterateStore(filteredList);
     $('.shopping-list').html(html.join(''));
}



function addItemToStore(item) {
  STORE.items.push({id: cuid(), name: item, checked: false});
}


function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(e) {
    e.preventDefault();
    let newItem = $('.js-shopping-list-entry').val();
    console.log(newItem);
    $('.js-shopping-list-entry').val('');
    addItemToStore(newItem);
    renderShoppingList();
  });
  console.log('`handleNewItemSubmit` ran');
}


function handleEditItem(name){
    $('ul').on('click', '.shopping-item-edit', () => {
        let editedItem = $(this).closest('li').attr(id)
        console.log(editedItem);
    })

}






function handleSearchTerm() {
    $('#search-term-form').submit(function(e) {
        e.preventDefault();
        let searchTerm = $('.search-term-entry').val();
        $('.search-term-entry').val('')
        STORE.searchTerm = searchTerm;
        renderShoppingList();
    });
}

function filterBySearchTerm(searchTerm) {
    const newFilteredList = STORE.items.filter(item => item.name.includes(searchTerm, 0));
    return newFilteredList;
}

function filterByChecked(){
    const newFilteredList = STORE.items.filter(item => !item.checked);
    return newFilteredList;
}

function checkItem(id) {
  STORE.items.map(item => {
    if (item.id === id) {
      item.checked = !item.checked;
    }
  });
}

function handleItemCheckClicked() {
  $('ul').on('click', '.shopping-item-check', function() {
    const id = $(this).closest('li').attr('id');
    checkItem(id);
    renderShoppingList();
  })
  console.log('`handleItemCheckClicked` ran');
}


function deleteItem(id) {
  STORE.items.map((item, i) => {
    if (item.id === id) {
      STORE.items.splice(i, 1);
    }
  });
}


function handleDeleteItemClicked() {
  $('ul').on('click', '.shopping-item-delete', function() {
    const id = $(this).closest('li').attr('id');
    deleteItem(id);
    renderShoppingList();
  });
  console.log('`handleDeleteItemClicked` ran');
}


function toggleHide() {
    STORE.hideCompleted = !STORE.hideCompleted; 
}


function handleToggleHide() {
  $('.js-hide-completed-toggle').on('click', () => {
    toggleHide();
    renderShoppingList();
    });
}   



function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleToggleHide()
  handleSearchTerm()
  handleEditItem()
}

$(handleShoppingList);