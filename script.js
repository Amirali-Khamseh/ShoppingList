//DOM queries
const itemForm = document.querySelector('#item-form');
const itemInput =  document.querySelector('#item-input');
const itemList =  document.querySelector('#item-list');
const itemClear =  document.querySelector('#clear');
const itemfilter =  document.querySelector('#filter');
const formomBtn = itemForm.querySelector('button');
let Edit = false;

//Checking the state of the program for displaying or hiding the filter and clear button
function CheckUI(){
    const list = itemList.querySelectorAll('li');
    const filter = document.querySelector('#filter');

    if(!list.length){
            itemClear.style.display = 'none';
            filter.style.display = 'none';
    }else{
        itemClear.style.display = 'block';
        filter.style.display = 'block';
    }
}

CheckUI()
function clearInput(){
    itemInput.value = ''
}

//Adding items to the list
itemForm.addEventListener('submit',(e)=>{
    e.preventDefault();
   
    if(itemInput.value === ''){
        alert('enter avalid Item')
        return; 
    }else{
     if(Edit){
         const itemToEdit = itemList.querySelector('.edit-mode');
         removeItemFromStrg(itemToEdit.textContent);
         itemToEdit.classList.remove('edit-remove');
         itemToEdit.remove();
         Edit=false;
        alert('Changes applied Press submit')
        formomBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Submit';
        formomBtn.style.backgroundColor='black';
        formomBtn.style.color='white';
     }else{
        addToDom();
        addToStorage(itemInput.value);
        clearInput();
        CheckUI();
     }

     
    
    }
      
})
//Add to Dom
function addToDom(){
    const li = document.createElement('li');
    li.innerText = itemInput.value;
    const button = document.createElement('button');
    button.className ="remove-item btn-link text-red";
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark'
   
    button.appendChild(icon)
    li.appendChild(button)
    itemList.appendChild(li)
}

function addToDomFromStrg(item){
    const li = document.createElement('li');
    li.innerText = item;
    const button = document.createElement('button');
    button.className ="remove-item btn-link text-red";
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-xmark'
   
    button.appendChild(icon)
    li.appendChild(button)
    itemList.appendChild(li)
}

// Add to Local strorage

function addToStorage(item){
 //checking for the xisting values in LS
 let itemsStorage = getItemsFromStorage();
  //Convert to Json string and set to local storage
  itemsStorage.push(item);
  localStorage.setItem('items',JSON.stringify(itemsStorage))
}

//Getting items from local storage
function getItemsFromStorage(){
    let itemsStorage;
    if(localStorage.getItem('items')===null){
        itemsStorage = [];
    }else{
        itemsStorage = JSON.parse(localStorage.getItem('items'))
    }
   
    return itemsStorage;
}

function displayItems(){
    let itemsStorage = getItemsFromStorage();
    itemsStorage.forEach((item)=>addToDomFromStrg(item));
    CheckUI();
}

//adding an event to document itself for getting the items in storagewhenever the page is loaded
document.addEventListener('DOMContentLoaded',displayItems);

//Another way to delete 
/*function deleteMe(item){
     if(confirm('Are you sure you want to clear the whole list ???'))
    item.parentElement.parentElement.remove();
}
function deleteOption(){
    const list = itemList.querySelectorAll('li>button>i');
    list.forEach(item =>{
        item.setAttribute('onclick',"deleteMe(this)")
    })
}
deleteOption() */

//Editing
function setItemToEdit(item){
itemList.querySelectorAll('li').forEach((item)=>item.classList.remove('edit-mode'))

    Edit = true;
    item.classList.add('edit-mode');
    formomBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update';
    formomBtn.style.backgroundColor='green';
    formomBtn.style.color='white';

    itemInput.value = item.textContent
}


//Deleting items with the help of event delegation 

function onDeleteItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        deleteItem(e.target.parentElement.parentElement)
    }else{
        setItemToEdit(e.target);
    }
}

function removeItemFromStrg(item){
    let itemsStorage = getItemsFromStorage();
    itemsStorage=itemsStorage.filter(i=>i !== item)
    localStorage.setItem('items',JSON.stringify(itemsStorage))
}
function deleteItem(item){
 if(confirm('are You sure you want to delete this item ?')){
     item.remove();
   
     //removing from storage
     removeItemFromStrg(item.textContent);

     CheckUI();
    }
    }
itemList.addEventListener('click',onDeleteItem)


//Clearing all  Items on the list
function clearItems(e){
    const list = itemList.querySelectorAll('li');
    if(confirm('Are you sure you want to clear the whole list ???')){
    list.forEach((item)=>item.remove())
    //clearibg LocalStorage
    localStorage.removeItem('items');

    CheckUI()
 }

}
itemClear.addEventListener('click',clearItems)

//Filtering

function searchItem(e){
    const itemToSearch = e.target.value.toLowerCase();
    const list = itemList.querySelectorAll('li');
    list.forEach((item)=>{
        const liName = item.textContent.toLowerCase();
        if(liName.includes(itemToSearch))
        {
            item.style.display='flex';
        }else{
            item.style.display='none';
        }
    })
 
}

itemfilter.addEventListener('input',searchItem)


