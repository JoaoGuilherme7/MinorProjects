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

    return li;
}

function pasteToDoTask(liToDoTask){
    liToDoTask.querySelector('input[type="checkbox"]').setAttribute('name', 'toDoTask');
    liToDoTask.querySelector('input[type="checkbox"]').setAttribute('onchange', 'manipulateCheckedBox()');
    liToDoTask.querySelector('.deleteButton').style.display = 'none';
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

    
    field('#doneTasksList').appendChild(doneTask);
}

function manipulateCheckedBox() {
    const doneTask = findSelectedLi();
    field('#toDoTasksList').removeChild(doneTask);
    pasteDoneTask(doneTask);
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


function deleteFromDoneTasks(li){
    field('#doneTasksList').removeChild(li);
}

function deleteAllDoneItems() {
    field('#doneTasksList').innerHTML = '';
}

function main() {
    const form = field('form');


    formatForm();
    veryfyInputContent();

    form.onsubmit = () => {
        createToDoList();
        // Stop form submiting
        return false;
    }
}
main();
