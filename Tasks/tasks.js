const field = (seletor) => document.querySelector(seletor);

function veryfyInputContent() {
    const submitButton = field('#submit');
    const inputField = field('#task');

    inputField.onkeyup = () => {
        if (inputField.value.length > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
}

function formatForm() {
    const inputField = field('#task');
    //CLEAR INPUT FIELD & SET SUBMIT BUTTON DISABLED
    field('#task').value = '';
    field('#submit').disabled = true;
    inputField.focus();
}



// :::::::::::::::::::::::::::::::::::::::::
// ---------CREATE TODO LIST-------------


function getTask() {
    const task = field('#task').value;
    return task;
}

function transformToLi(value) {

    const li = document.createElement('li');

    const label = document.createElement('label');
    li.appendChild(label);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = value;
    label.appendChild(checkbox);

    const span = document.createElement('span');
    span.classList.add('checkSpan');
    label.appendChild(span);

    const p = document.createElement('p');
    p.innerText = value;
    li.appendChild(p);

    const btn = document.createElement('button');
    btn.setAttribute('onclick', 'deleteFromDoneTasks(this.parentNode)');
    btn.classList.add('deleteButton');
    btn.innerText = 'X';
    li.appendChild(btn);

    const dragIcon = document.createElement('i');
    dragIcon.setAttribute('draggable', true);
    dragIcon.classList.add('drag-icon');
    dragIcon.classList.add('fa-solid');
    dragIcon.classList.add('fa-grip');
    li.appendChild(dragIcon);

    return li;
}

function pasteToDoTask(liToDoTask) {
    liToDoTask.querySelector('input[type="checkbox"]').setAttribute('name', 'toDoTask');
    liToDoTask.querySelector('input[type="checkbox"]').setAttribute('onchange', 'manipulateCheckedBox()');
    liToDoTask.querySelector('.deleteButton').style.display = 'none';
    liToDoTask.querySelector('.drag-icon').style.display = 'block';

    field('#toDoTasksList').appendChild(liToDoTask);
}

function createToDoList() {
    const task = getTask()

    pasteToDoTask(transformToLi(task))
    formatForm();
}


// ::::::::::::::::::::::::::::::::::::::::::
// -----------TODO TO DONE-----------


function findSelectedLi() {
    const selected = field('input[name="toDoTask"]:checked');
    return selected.parentNode.parentNode;
}

function pasteDoneTask(doneTask) {
    doneTask.querySelector('input[type=checkbox]').setAttribute('name', 'doneTask');
    doneTask.querySelector('input[type=checkbox]').setAttribute('onchange', 'manipulateUncheckedBox()');
    doneTask.querySelector('.deleteButton').style.display = 'block';
    // doneTask.querySelector('.drag-icon').style.display = 'none';


    field('#doneTasksList').appendChild(doneTask);
    positionDeleteButton(doneTask);

}

function manipulateCheckedBox() {
    const doneTask = findSelectedLi();
    field('#toDoTasksList').removeChild(doneTask);
    pasteDoneTask(doneTask);
    manipulateDrag();

}



// :::::::::::::::::::::::::::::::::::::::::
// -----------DONE TO TODO-----------


function findUnselected() {
    const unselected = field('input[name="doneTask"]:not(:checked)');
    return unselected.parentNode.parentNode;
}

function manipulateUncheckedBox() {

    const toDoTask = findUnselected();

    field('#doneTasksList').removeChild(toDoTask);
    pasteToDoTask(toDoTask);

}



// :::::::::::::::::::::::::::::::::::::::::
// -----------DELETE DONE ITEMS-----------


function deleteFromDoneTasks(li) {
    field('#doneTasksList').removeChild(li);
}

function deleteAllDoneItems() {
    field('#doneTasksList').innerHTML = '';
}

function main() {
    const form = field('form');


    formatForm();
    veryfyInputContent();

    form.onsubmit = (event) => {
        event.preventDefault();
        createToDoList();
        manipulateDrag();
    }
}
main();

// :::::::::::::::::::::::::::::::::::::::::
// -----------DRAGGING ITEMS-----------

function manipulateDrag() {

    const items = document.querySelectorAll('.drag-icon');

    items.forEach(item => {
        const li = item.parentNode;

        item.addEventListener('dragstart', () => {
            li.classList.add('dragging');
        })

        item.addEventListener('dragend', () => li.classList.remove('dragging'));

        field(`#${li.parentNode.id}`).addEventListener('dragover', (event) => initSortableList(event, li.parentNode.id));
    })
}

const initSortableList = (event, parentList) => {
    event.preventDefault();
    const list = field(`#${parentList}`);
    const draggingItem = list.querySelector('.dragging')
    const siblings = [...list.querySelectorAll(`#${parentList} li:not(.dragging)`)];

    let nextSibling = siblings.find(sibling => {
        return event.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });


    list.insertBefore(draggingItem, nextSibling);
}

function positionDeleteButton(li){
    const liHeight = li.offsetHeight;

    if(liHeight> 35){

        const deleteBtn = li.querySelector('.deleteButton')
        deleteBtn.style.position = 'absolute';
        deleteBtn.style.top = '5px';
        deleteBtn.style.right = '5px';

        if(liHeight<= 61){
            const dragBtn = li.querySelector('.drag-icon');
            dragBtn.style.position = 'relative';
            dragBtn.style.top = '5px';
        }
    }
}


// function pxToRem(element){
//     return 
// }

