'use strict'

const form = document.forms.form,
      input = form.input,
      btnAdd = form.add,
      btnRemove = form.remove,
      queue = document.querySelector('.queue');

const MAX_ITEMS = 21;

const items = getDataFromLocalStorage() || []; 


btnAdd.addEventListener('click', (e)=>{
    e.preventDefault();
    addItem();
})

btnRemove.addEventListener('click', (e)=>{
    e.preventDefault();
    removeItem();
})

function addItem(){
    const value = input.value;
    input.value = '';

    if(value != ''){
        items.push(value);
        localStorage.setItem('items', items);
        createItem(value);
    }

    else{
        alert('Please, fill the input field');
        return;
    }

    if(items.length == 1) btnRemove.disabled=false; // if items.length == 1, it means that before click items.length was 0 and remove btn was disable, so it must be enabled now 

    if(items.length == MAX_ITEMS){
        btnAdd.disabled = true;
        setTimeout(function() { alert('Queue is full'); }, 0);
    }
}
    

function removeItem(){

    queue.removeChild(queue.firstElementChild);
    items.shift();
    localStorage.setItem('items', items);

    if(items.length == 0) {
        btnRemove.disabled = true;
        localStorage.removeItem('items')
    }

    if(items.length < MAX_ITEMS) btnAdd.disabled = false;
}

function getDataFromLocalStorage(){

    if(localStorage.getItem('items')){
        const dataFromStorage = localStorage.getItem('items');
            return dataFromStorage.split(',');
    }
}

function createItem(value){

    const newItem = document.createElement('div');
    newItem.className = 'queue__item';
    newItem.innerHTML = value;
    queue.appendChild(newItem);
}

(function fillQueue(){
    if(items.length == MAX_ITEMS){
        btnAdd.disabled = true;
    }
    if(items.length == 0){
        btnRemove.disabled = true;
        return;
    }
    items.forEach(item => createItem(item))
})();
