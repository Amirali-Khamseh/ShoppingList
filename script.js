//DOM queries
const itemForm = document.querySelector('#item-form');
const itemInput =  document.querySelector('#item-input');
const itemList =  document.querySelector('#item-list');
const itemClear =  document.querySelector('#clear');

//Checking the state of the program for displaying or hiding the filter and clear button
function CheckUI(){
    const list = itemList.querySelectorAll('li');
    const filter = document.querySelector('#filter');
 console.log(filter)
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
    const li = document.createElement('li');
    if(itemInput.value === ''){
        alert('enter avalid Item')
        return; 
    }else{
        li.innerText = itemInput.value;
        const button = document.createElement('button');
        button.className ="remove-item btn-link text-red";
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-xmark'
       
        button.appendChild(icon)
        li.appendChild(button)
        itemList.appendChild(li)
      clearInput();
      CheckUI();
    
    }
      
})

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

//Deleting items with the help of event delegation 
function deleteItem(e){
if(e.target.parentElement.classList.contains('remove-item')){
    e.target.parentElement.parentElement.remove()
    CheckUI()
}

}

itemList.addEventListener('click',deleteItem)


//Clearing Items on the list
function clearItems(e){
    const list = itemList.querySelectorAll('li');
    if(confirm('Are you sure you want to clear the whole list ???')){
    list.forEach((item)=>item.remove())
    CheckUI()
 }

}
itemClear.addEventListener('click',clearItems)