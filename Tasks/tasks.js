
document.addEventListener('DOMContentLoaded', () => {

    formatForm();
    veryfyInputContent();

    const form = document.querySelector('form');
    form.onsubmit = () => {
        createToDoList();
        // Stop form submiting
        return false;
    }

    // when input[name="toDoTask"]:checked
    // manipulateCheckedBox();

    // when input[name="doneTask"]:not(:checked)
    // manipulateUncheckedBox();
})

function veryfyInputContent() {
    const submitButton = document.querySelector('#submit');
    const inputField = document.querySelector('#task');

    inputField.onkeyup = () => {
        if (inputField.value.length > 0) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
}

function formatForm() {
    const inputField = document.querySelector('#task');
    //CLEAR INPUT FIELD & SET SUBMIT BUTTON DISABLED
    document.querySelector('#task').value = '';
    document.querySelector('#submit').disabled = true;
    inputField.focus();
}

// :::::::::::::::::::::::::::::::::::::::::
// ---------CREATE TODO LIST-------------

function transformToLi(value) {
    const li = ` <li data-index = ${toDo.indexOf(value)}>
                    <label >
                        <input type="checkbox" name="toDoTask" value="${value}" onchange="manipulateCheckedBox()">
                        <span class="checkSpan"></span>
                    </label>
                    <p>${value}</p>               
                </li>`;
    return li;
}

function pasteToDoTask(array) {
    document.querySelector('#tasksList').innerHTML = array;
}

function getTask() {
    const task = document.querySelector('#task').value;
    return task;
}

function add_ToArray_(iten, array) {

    array.push(iten);
    return array;
}

var toDo = [];

// pega a tarefa digitada(getTask), adiciona ao array de tarefas(add_ToArray_), transforma em uma lista de li's(transformToLi),concatena as li's e cola na ul ToDo(pasteToDoTask) e limpa o input.
function createToDoList() {
    const task = getTask()
    add_ToArray_(task, toDo);
    let liToDoArray = toDo.map(transformToLi).join('');
    pasteToDoTask(liToDoArray)
    formatForm();
}

// ::::::::::::::::::::::::::::::::::::::::::
// -----------TODO TO DONE-----------

var done = [];

// retorna apenas a string da task
function findSelected() {
    let selected = document.querySelector('input[name="toDoTask"]:checked').value;
    return selected;
}
// transforma cada item em uma li com os atributos necessarios 
// Ajeitar o delete
function transformToDoneLi(value) {

    const li = ` <li data-index = ${done.indexOf(value)}>
                    <label>
                        <input type="checkbox" name="doneTask" value="${value}" onchange="manipulateUncheckedBox()" checked>
                        <span class="checkSpan"></i></span>
                    </label>
                    <p>${value}</p>
                    <button onclick="deleteFromArray(this)"} class="deleteButton">X</button>
                </li>`;
    return li;
}
// "pega o array de li concatenado e publica na ul "Done"
function pasteDoneTask(array) {
    document.querySelector('#doneTasksList').innerHTML = array;
}
// tendo o conteúdo, retorna o indice dele no array passado.
function takeIndex(array, value) {
    return array.indexOf(value);
}
// remove o conteudo do indice recebido no array tambem recebido
function deleteIndex_From_(index, array) {
    array.splice(index, 1)
}

// pega a atividade que recebeu check,pega o indice dessa atividade no array toDo para então deletar essa posição do array.Com o array atualizado ele passa pelo processo de criação das Li's, concatenação e publicação no "To Do". A atividade checada então é agregada ao array Done, que passa pelo processo de  criação de li's concatenação e publicação no "Done".
function manipulateCheckedBox() {

    let doneTask = findSelected();
    let indexToDelete = takeIndex(toDo, doneTask);
    deleteIndex_From_(indexToDelete, toDo);
    // publicar ToDoList atualizada
    let liToDoArray = toDo.map(transformToLi).join('');
    pasteToDoTask(liToDoArray);
    // 
    add_ToArray_(doneTask, done);
    const liDoneArray = done.map(transformToDoneLi).join('');
    // console.log(liDoneArray)
    pasteDoneTask(liDoneArray)
}

// :::::::::::::::::::::::::::::::::::::::::
// -----------DONE TO TODO-----------

function findUnselected() {
    let unselected = document.querySelector('input[name="doneTask"]:not(:checked)').value;
    return unselected;
}
//pega a atividade que foi removido o check, pega o indice dessa atividade no array "done[]" para então deletar essa posição do array. Com o array Done atualizado ele passa pelo processo de criação das Li's, concatenação e publicação no "Done". A atividade que foi removido o check então é agregada ao array de ToDo que passa pelo processo de  criação de li's concatenação e publicação no "To Do".
function manipulateUncheckedBox() {

    let toDoTask = findUnselected();

    let indexToDelete = takeIndex(done, toDoTask);
    deleteIndex_From_(indexToDelete, done);
    // publicar ToDoList atualizada
    let liDoneArray = done.map(transformToDoneLi).join('');
    pasteDoneTask(liDoneArray);

    add_ToArray_(toDoTask, toDo);
    let liToDoArray = toDo.map(transformToLi).join('');
    pasteToDoTask(liToDoArray)
    // formatForm();
}

// :::::::::::::::::::::::::::::::::::::::::
// -----------DELETAR DONE ITEM-----------

function getDataIndexDaLiDo(botao) {
    var elementoPai = botao.parentNode;
    var dataIndex = elementoPai.dataset.index;
    return dataIndex;
}

function deleteFromArray(botao) {
    const indexToDelete = getDataIndexDaLiDo(botao);
    deleteIndex_From_(indexToDelete, done);

    // publicar ToDoList atualizada
    let liDoneArray = done.map(transformToDoneLi).join('');
    pasteDoneTask(liDoneArray);
}
